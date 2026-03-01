<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PremiumRequest;
use App\Models\Company;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use App\Mail\PremiumRequestMail;
use Carbon\Carbon;

class PremiumRequestController extends Controller
{
    /**
     * Store a newly created resource in storage.
     * Accessible by Company Admins to submit a payment proof.
     */
    public function store(Request $request)
    {
        $request->validate([
            'module' => 'required|string|in:ai_studio,support_analytics,both',
            'payment_method' => 'required|string',
            'amount' => 'nullable|numeric',
            'currency' => 'nullable|string|max:10',
            'payment_proof' => 'required_if:payment_method,transfer|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        $user = auth('api')->user();
        if (!$user || !$user->company_id) {
            return response()->json(['message' => 'User does not belong to a company'], 403);
        }

        $proofPath = null;
        if ($request->hasFile('payment_proof')) {
            $proofPath = $request->file('payment_proof')->store('premium_proofs', 'public');
        }

        $status = in_array($request->payment_method, ['paypal', 'credit_card']) ? 'approved' : 'pending';
        $durationMonths = $status === 'approved' ? 1 : null; // Por defecto 1 mes para pagos automáticos

        $premiumRequest = PremiumRequest::create([
            'company_id' => $user->company_id,
            'user_id' => $user->id,
            'module' => $request->module,
            'payment_method' => $request->payment_method,
            'payment_proof' => $proofPath,
            'amount' => $request->amount,
            'currency' => $request->currency,
            'status' => $status,
            'duration_months' => $durationMonths,
            'admin_notes' => $status === 'approved' ? 'Aprobado automáticamente por pago electrónico' : null,
        ]);

        if ($status === 'approved') {
            // Apply expiration dates immediately
            $company = Company::find($user->company_id);
            if ($premiumRequest->module === 'ai_studio' || $premiumRequest->module === 'both') {
                $currentExp = $company->ai_studio_expires_at ? Carbon::parse($company->ai_studio_expires_at) : Carbon::now();
                if ($currentExp->isPast())
                    $currentExp = Carbon::now();
                $company->ai_studio_expires_at = $currentExp->addMonths(1)->toDateString();
            }

            if ($premiumRequest->module === 'support_analytics' || $premiumRequest->module === 'both') {
                $currentExp = $company->support_analytics_expires_at ? Carbon::parse($company->support_analytics_expires_at) : Carbon::now();
                if ($currentExp->isPast())
                    $currentExp = Carbon::now();
                $company->support_analytics_expires_at = $currentExp->addMonths(1)->toDateString();
            }
            $company->save();
        }

        // Only send Email and Notification for pending requests
        if ($status === 'pending') {
            try {
                Mail::to('info@megarys.com')->send(new PremiumRequestMail($premiumRequest, $user));
            } catch (\Exception $e) {
                \Log::error('Failed to send Premium Request Mail: ' . $e->getMessage());
            }

            // Notify Super Admins
            $superAdmins = User::whereHas('role', function ($q) {
                $q->where('name', 'ADMINISTRADOR GENERAL');
            })->get();

            foreach ($superAdmins as $admin) {
                Notification::create([
                    'user_id' => $admin->id,
                    'sent_by' => $user->id,
                    'title' => 'Nueva Solicitud Premium',
                    'message' => "La empresa {$user->company->name} ha solicitado acceso al módulo: {$request->module}.",
                    'type' => 'premium_request',
                    'link' => '/admin/suscripciones/solicitudes',
                    'is_read' => false,
                    'icon' => 'fas fa-star',
                    'color' => 'warning',
                ]);
            }
        }

        return response()->json([
            'message' => $status === 'approved' ? '¡Pago exitoso! Módulos habilitados.' : 'Solicitud enviada exitosamente. Nuestro equipo validará su comprobante en breve.',
            'data' => $premiumRequest,
            'status' => $status
        ], 201);
    }

    /**
     * Display a listing of the requests.
     * Accessible by Super Admins.
     */
    public function index(Request $request)
    {
        $status = $request->query('status');

        $query = PremiumRequest::with(['company', 'user'])->orderBy('created_at', 'desc');

        if ($status) {
            $query->where('status', $status);
        }

        $requests = $query->paginate(20);

        return response()->json($requests);
    }

    /**
     * Approve a pending request and allocate time.
     * Accessible by Super Admins.
     */
    public function approve(Request $request, $id)
    {
        $request->validate([
            'duration_months' => 'required|integer|min:1',
            'admin_notes' => 'required|string',
        ]);

        $premiumReq = PremiumRequest::findOrFail($id);

        if ($premiumReq->status !== 'pending') {
            return response()->json(['message' => 'Esta solicitud ya no está pendiente'], 400);
        }

        $premiumReq->status = 'approved';
        $premiumReq->duration_months = $request->duration_months;
        $premiumReq->admin_notes = $request->admin_notes;
        $premiumReq->approved_by = auth('api')->id();
        $premiumReq->save();

        // Update company expirations
        $company = Company::findOrFail($premiumReq->company_id);

        $months = $request->duration_months;

        if ($premiumReq->module === 'ai_studio' || $premiumReq->module === 'both') {
            $currentExp = $company->ai_studio_expires_at ? Carbon::parse($company->ai_studio_expires_at) : Carbon::now();
            if ($currentExp->isPast())
                $currentExp = Carbon::now();
            $company->ai_studio_expires_at = $currentExp->addMonths($months)->toDateString();
        }

        if ($premiumReq->module === 'support_analytics' || $premiumReq->module === 'both') {
            $currentExp = $company->support_analytics_expires_at ? Carbon::parse($company->support_analytics_expires_at) : Carbon::now();
            if ($currentExp->isPast())
                $currentExp = Carbon::now();
            $company->support_analytics_expires_at = $currentExp->addMonths($months)->toDateString();
        }

        $company->save();

        // Notify the company user
        Notification::create([
            'user_id' => $premiumReq->user_id,
            'sent_by' => auth('api')->id(),
            'title' => 'Solicitud Premium Aprobada',
            'message' => "Su solicitud para el módulo {$premiumReq->module} ha sido aprobada por {$months} mes(es).",
            'type' => 'premium_approved',
            'is_read' => false,
            'icon' => 'fas fa-check-circle',
            'color' => 'success',
        ]);

        return response()->json(['message' => 'Solicitud aprobada exitosamente', 'data' => $premiumReq]);
    }

    /**
     * Reject a pending request.
     * Accessible by Super Admins.
     */
    public function reject(Request $request, $id)
    {
        $request->validate([
            'admin_notes' => 'required|string',
        ]);

        $premiumReq = PremiumRequest::findOrFail($id);

        if ($premiumReq->status !== 'pending') {
            return response()->json(['message' => 'Esta solicitud ya no está pendiente'], 400);
        }

        $premiumReq->status = 'rejected';
        $premiumReq->admin_notes = $request->admin_notes;
        $premiumReq->approved_by = auth('api')->id();
        $premiumReq->save();

        // Notify the company user
        Notification::create([
            'user_id' => $premiumReq->user_id,
            'sent_by' => auth('api')->id(),
            'title' => 'Solicitud Premium Rechazada',
            'message' => "Su solicitud para el módulo {$premiumReq->module} no pudo ser aprobada. Motivo: {$request->admin_notes}",
            'type' => 'premium_rejected',
            'is_read' => false,
            'icon' => 'fas fa-times-circle',
            'color' => 'danger',
        ]);

        return response()->json(['message' => 'Solicitud rechazada', 'data' => $premiumReq]);
    }
}
