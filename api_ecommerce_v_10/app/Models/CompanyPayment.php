<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'amount',
        'payment_proof',
        'payment_method',
        'reason',
        'start_date',
        'end_date',
        'type',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
