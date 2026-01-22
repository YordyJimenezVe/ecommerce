<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'logo',
        'description',
        'email_contact',
        'social_links',
        'status',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];

    public function users()
    {
        return $this->hasMany(\App\User::class);
    }

    public function liveEvents()
    {
        return $this->hasMany(LiveEvent::class);
    }

    // In future: products, subcategories relations
}
