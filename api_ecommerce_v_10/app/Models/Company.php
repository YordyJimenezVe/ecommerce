<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', // Enforce sync
        'slug',
        'logo',
        'description',
        'email_contact',
        'social_links',
        'status',
        'membership_expires_at',
    ];

    protected $casts = [
        'social_links' => 'array',
        'membership_expires_at' => 'date',
    ];

    public function users()
    {
        return $this->hasMany(\App\User::class);
    }

    public function liveEvents()
    {
        return $this->hasMany(LiveEvent::class);
    }

    public function payments()
    {
        return $this->hasMany(CompanyPayment::class);
    }
}
