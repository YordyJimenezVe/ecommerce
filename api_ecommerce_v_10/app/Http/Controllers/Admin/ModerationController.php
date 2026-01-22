<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product\Product;
use App\Models\Company;

class ModerationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware(\App\Http\Middleware\SuperAdminMiddleware::class);
    }

    // Toggle Company Status (Block/Unblock)
    public function toggleCompanyStatus(Request $request, $id)
    {
        $company = Company::findOrFail($id);
        $company->status = ($company->status === 'active') ? 'suspended' : 'active';
        $company->save();

        // Optional: Suspend all products if company is suspended?
        // keeping it simple for now.

        return response()->json([
            'message' => 'Company status updated',
            'company' => $company
        ]);
    }

    // Toggle Product Status (Suspend/Approve)
    public function toggleProductStatus(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        // Toggle approved <-> rejected/suspended
        $product->admin_status = ($product->admin_status === 'approved') ? 'suspended' : 'approved';
        $product->save();

        return response()->json([
            'message' => 'Product status updated',
            'product' => $product
        ]);
    }
}
