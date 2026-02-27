<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketSurvey extends Model
{
    protected $fillable = ['ticket_id', 'attention_rating', 'issue_resolved', 'improvement_suggestion'];

    protected $casts = [
        'issue_resolved' => 'boolean',
        'attention_rating' => 'integer',
    ];

    public function ticket()
    {
        return $this->belongsTo(SupportTicket::class, 'ticket_id');
    }
}
