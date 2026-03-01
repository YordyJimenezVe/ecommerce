<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PremiumRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'user_id',
        'module',
        'payment_method',
        'payment_proof',
        'amount',
        'currency',
        'status',
        'duration_months',
        'admin_notes',
        'approved_by',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
