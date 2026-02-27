<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class TenantMiddleware
{
    /**
     * Handle an incoming request.
     * Ensures user belongs to a company if accessing company resources.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Super Admin bypass
        $roleName = $user->role ? $user->role->name : ($user->getAttribute('role') ?? '');
        if (strtolower($user->email) === 'yordyalejandro13@gmail.com' || $roleName === 'super_admin' || $roleName === 'ADMINISTRADOR GENERAL') {
            return $next($request);
        }

        // Check if user has a company assigned
        if (!$user->company_id) {
            return response()->json(['message' => 'Forbidden. You do not belong to any company.'], 403);
        }

        // If route has {company} parameter, verify match
        $routeCompany = $request->route('company');
        if ($routeCompany && $routeCompany != $user->company_id) {
            return response()->json(['message' => 'Forbidden. Access denied to this company.'], 403);
        }

        // Check company status
        if ($user->company && $user->company->status === 'suspended') {
            return response()->json([
                'message' => 'Your company account is suspended. Please contact support.',
                'status' => 'suspended'
            ], 403);
        }

        // Inject company_id into request for Controllers to use
        $request->merge(['tenant_id' => $user->company_id]);

        return $next($request);
    }
}
