<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LiveEvent extends Model
{
    protected $fillable = [
        'company_id',
        'title',
        'description',
        'embed_url',
        'scheduled_at',
        'status',
        'notification_sent',
    ];

    protected $dates = ['scheduled_at'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
