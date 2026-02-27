<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CompanyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware(\App\Http\Middleware\SuperAdminMiddleware::class);
    }

    public function index()
    {
        $companies = Company::orderBy('created_at', 'desc')->get()->map(function ($company) {
            $company->is_expired = $company->membership_expires_at ? now()->gt($company->membership_expires_at) : false;
            return $company;
        });
        return response()->json(['companies' => $companies], 200);
    }

    public function show($id)
    {
        $company = Company::findOrFail($id);
        $company->is_expired = $company->membership_expires_at ? now()->gt($company->membership_expires_at) : false;
        return response()->json(['company' => $company], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email_admin' => 'required|email|unique:users,email',
            'password_admin' => 'required|min:6',
            'slug' => 'required|unique:companies,slug',
            'membership_duration' => 'required|in:1,3,6,12', // Months
            'payment_method' => 'required|in:transfer,cash,free,yape,plin,bcp,bbva,interbank,paypal,credit_card',
            'logo_file' => 'nullable|image|max:10240', // 10MB
            'payment_proof' => 'nullable|file|max:10240',
        ]);

        // Calculate Expiration
        $expiresAt = now()->addMonths((int) $request->membership_duration);

        // 1. Upload Logo
        $logo = 'companies/default-logo.png';
        if ($request->hasFile('logo_file')) {
            $logo = $request->file('logo_file')->store('companies', 'public');
        }

        // 2. Create Company
        $company = Company::create([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
            'email_contact' => $request->email_admin, // Default contact is admin email
            'status' => 'active',
            'membership_expires_at' => $expiresAt,
            'logo' => $logo,
        ]);

        $payment_proof = null;
        if ($request->hasFile('payment_proof')) {
            $payment_proof = $request->file('payment_proof')->store('payments', 'public');
        }

        // 2. Create Payment Record
        $company->payments()->create([
            'amount' => $request->payment_method == 'free' ? 0 : $request->payment_amount,
            'payment_proof' => $payment_proof,
            'payment_method' => $request->payment_method,
            'reason' => $request->reason,
            'start_date' => now(),
            'end_date' => $expiresAt,
            'type' => 'initial'
        ]);

        // 3. Create Company Admin User
        $role = \App\Models\Role::firstOrCreate(['name' => 'ADMINISTRADOR DE EMPRESA']);

        $user = User::create([
            'name' => 'Admin ' . $request->name,
            'surname' => 'Tenant',
            'email' => $request->email_admin,
            'password' => $request->password_admin, // User model automatically hashes via mutator or casts
            'role_id' => $role->id,
            'state' => 1,
            'company_id' => $company->id
        ]);

        // 4. Log Action in Bitácora
        $company->logAction('COMPANY_CREATED', 'Se registró la empresa ' . $company->name . ' con método de pago ' . $request->payment_method, [
            'admin_user_id' => $user->id,
            'membership_expires_at' => $expiresAt
        ]);

        return response()->json([
            'message' => 'Company created successfully',
            'company' => $company,
            'admin_user' => $user
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);
        $company->update($request->all());
        return response()->json(['message' => 'Company updated', 'company' => $company]);
    }

    public function destroy($id)
    {
        $company = Company::findOrFail($id);
        $company->delete(); // Physical delete (SoftDeletes removed from model)
        return response()->json(['message' => 'Company deleted']);
    }
}
