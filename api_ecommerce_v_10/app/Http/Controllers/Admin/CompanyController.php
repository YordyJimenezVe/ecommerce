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
        $companies = Company::orderBy('created_at', 'desc')->get();
        return response()->json(['companies' => $companies], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email_admin' => 'required|email|unique:users,email',
            'password_admin' => 'required|min:6',
            'slug' => 'required|unique:companies,slug',
            'membership_duration' => 'required|in:1,3,6,12', // Months
            'payment_method' => 'required|in:transfer,cash,free',
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
            'email' => $request->email_admin,
            'password' => Hash::make($request->password_admin),
            'role_id' => $role->id,
            'role' => 'company_admin', // Ensure string column is set
            'type_user' => 2, // Admin user
            // 'company_id' => $company->id // Uncomment when migration is added
        ]);

        // If the users table has company_id, we can update it. 
        // For now, I will assume we need to add the column via migration.
        // But to prevent crash if column exists:
        if (\Schema::hasColumn('users', 'company_id')) {
            $user->company_id = $company->id;
            $user->save();
        }

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
        $company->delete(); // Soft delete
        return response()->json(['message' => 'Company deleted']);
    }
}
