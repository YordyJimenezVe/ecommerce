<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\User;
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
        ]);

        // Calculate Expiration
        $expiresAt = now()->addMonths((int) $request->membership_duration);

        // 1. Create Company
        $company = Company::create([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
            'email_contact' => $request->email_admin, // Default contact is admin email
            'status' => 'active',
            'membership_expires_at' => $expiresAt,
            'logo' => $request->logo,
        ]);

        // 2. Create Payment Record
        $company->payments()->create([
            'amount' => $request->payment_method == 'free' ? 0 : $request->payment_amount,
            'payment_proof' => $request->payment_proof,
            'payment_method' => $request->payment_method,
            'reason' => $request->reason,
            'start_date' => now(),
            'end_date' => $expiresAt,
            'type' => 'initial'
        ]);

        // 3. Create Company Admin User
        $user = User::create([
            'name' => 'Admin ' . $request->name,
            'email' => $request->email_admin,
            'password' => Hash::make($request->password_admin),
            'role' => 'company_admin',
            'company_id' => $company->id
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
        $company->delete(); // Soft delete
        return response()->json(['message' => 'Company deleted']);
    }
}
