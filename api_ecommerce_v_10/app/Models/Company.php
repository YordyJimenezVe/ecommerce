<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Company extends Model
{

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
        return $this->hasMany(User::class);
    }

    public function liveEvents()
    {
        return $this->hasMany(LiveEvent::class);
    }

    public function payments()
    {
        return $this->hasMany(CompanyPayment::class);
    }

    public function products()
    {
        return $this->hasMany(Product\Product::class);
    }

    public function logAction($action, $description = null, $metadata = null)
    {
        return SystemLog::create([
            'user_id' => auth('api')->id(),
            'company_id' => $this->id,
            'action' => $action,
            'description' => $description,
            'metadata' => $metadata,
            'ip_address' => request()->ip(),
        ]);
    }
}
