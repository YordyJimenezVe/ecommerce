<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class SuperAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        // Check if user is logged in
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Hardcoded Superuser Check (Case Insensitive)
        if (strtolower($user->email) === 'yordyalejandro13@gmail.com') {
            return $next($request);
        }

        // Role based check (fallback)
        // Accepts 'super_admin' OR 'ADMINISTRADOR GENERAL' (from manual DB update)
        if ($user->role === 'super_admin' || $user->role === 'ADMINISTRADOR GENERAL') {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden. Super Admin access required.'], 403);
    }
}
