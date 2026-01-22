<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class TenantScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        if (Auth::check()) {
            $user = Auth::user();

            // Sudo Mode: Super Admin sees everything
            if ($user->email === 'Yordyalejandro13@gmail.com' || $user->role === 'super_admin') {
                return;
            }

            // Tenant Mode: Filter by company_id
            if ($user->company_id) {
                $builder->where('company_id', $user->company_id);
            }
        }
    }
}
