<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketDailyNotification extends Model
{
    protected $fillable = ['ticket_id', 'notification_date', 'sent_at'];

    protected $casts = [
        'notification_date' => 'date',
        'sent_at' => 'datetime',
    ];

    public function ticket()
    {
        return $this->belongsTo(SupportTicket::class, 'ticket_id');
    }
}
