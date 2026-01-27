<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompanyPaymentConfig extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'method_type', // PAYPAL, STRIPE, MANUAL
        'configuration', // JSON
        'is_active',
    ];

    protected $casts = [
        'configuration' => 'array',
        'is_active' => 'boolean',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
