<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketAiAnalysis extends Model
{
    protected $table = 'ticket_ai_analyses';

    protected $fillable = [
        'ticket_id',
        'staff_rating',
        'treated_poorly',
        'poor_treatment_reason',
        'main_issue',
        'resolved',
        'summary',
        'analyzed_at',
    ];

    protected $casts = [
        'treated_poorly' => 'boolean',
        'analyzed_at' => 'datetime',
    ];

    public function ticket()
    {
        return $this->belongsTo(SupportTicket::class);
    }
}
