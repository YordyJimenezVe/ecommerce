<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\Sale\Sale;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Support\Facades\Mail;
use App\Mail\PaymentNotificationMail; // We will create this

class BillingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        // Filter by payment status if needed, default PENDING
        $status = $request->payment_status ?? 'PAID_PENDING';

        $user = auth()->user();

        $query = Sale::where('payment_status', $status)
            ->whereIn('method_payment', ['TRANSFERENCIA', 'PAGO_MOVIL', 'MANUAL_PAYMENT'])
            ->with(['user', 'sale_details.product.company']);

        if (!$user->hasPermission('view_global_sales') && $user->company_id) {
            $query->whereHas("sale_details.product", function ($q) use ($user) {
                $q->where("company_id", $user->company_id);
            });
        }

        $sales = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            'sales' => $sales
        ]);
    }

    public function approve(Request $request, $id)
    {
        $sale = Sale::findOrFail($id);
        $sale->update(['payment_status' => 'PAID_APPROVED']);

        // Stock deduction should normally happen on 'Created' or here. 
        // Assuming it validates payment.

        // Notify User
        Notification::create([
            'user_id' => $sale->user_id,
            'title' => 'Pago Aprobado',
            'message' => 'Tu pago para la orden #' . $sale->id . ' ha sido aprobado.',
            'type' => 'order_status',
            'link' => '/perfil-del-cliente?selected_menu=4' // Orders
        ]);

        // Send Email (Mocking the Mailable call)
        // Mail::to($sale->user->email)->send(new PaymentNotificationMail($sale, 'APPROVED'));

        return response()->json(['message' => 200]);
    }

    public function reject(Request $request, $id)
    {
        $request->validate(['reason' => 'required|string']);

        $sale = Sale::findOrFail($id);
        $sale->update([
            'payment_status' => 'PAID_REJECTED',
            'rejection_reason' => $request->reason
        ]);

        // Restore Stock if needed (omitted for brevity unless requested)

        // Notify User
        Notification::create([
            'user_id' => $sale->user_id,
            'title' => 'Pago Rechazado',
            'message' => 'Tu pago para la orden #' . $sale->id . ' ha sido rechazado. Motivo: ' . $request->reason,
            'type' => 'order_status',
            'link' => '/perfil-del-cliente?selected_menu=4'
        ]);

        // Send Email
        // Mail::to($sale->user->email)->send(new PaymentNotificationMail($sale, 'REJECTED', $request->reason));

        return response()->json(['message' => 200]);
    }
}
