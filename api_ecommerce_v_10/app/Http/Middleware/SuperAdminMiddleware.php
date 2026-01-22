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

        // Hardcoded Superuser Check as requested
        if ($user->email === 'Yordyalejandro13@gmail.com') {
            return $next($request);
        }

        // Role based check (fallback)
        if ($user->role === 'super_admin') {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden. Super Admin access required.'], 403);
    }
}
