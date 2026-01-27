<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CompanyPaymentConfig;

class CompanyPaymentConfigController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $company_id = auth()->user()->company_id;
        $configs = CompanyPaymentConfig::where('company_id', $company_id)->get();
        return response()->json(['configs' => $configs], 200);
    }

    public function store(Request $request)
    {
        $company_id = auth()->user()->company_id;

        $request->validate([
            'method_type' => 'required|string',
            'configuration' => 'required|array',
        ]);

        $config = CompanyPaymentConfig::create([
            'company_id' => $company_id,
            'method_type' => $request->method_type,
            'configuration' => $request->configuration,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json(['message' => 200, 'config' => $config]);
    }

    public function update(Request $request, $id)
    {
        $company_id = auth()->user()->company_id;
        $config = CompanyPaymentConfig::where('company_id', $company_id)->findOrFail($id);

        $config->update($request->all());

        return response()->json(['message' => 200, 'config' => $config]);
    }

    public function destroy($id)
    {
        $company_id = auth()->user()->company_id;
        $config = CompanyPaymentConfig::where('company_id', $company_id)->findOrFail($id);
        $config->delete();

        return response()->json(['message' => 200]);
    }
}
