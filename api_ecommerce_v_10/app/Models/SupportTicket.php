<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'created_by',
        'assigned_to',
        'subject',
        'description',
        'status',
        'priority',
        'category',
        'closed_at',
    ];

    protected $casts = [
        'closed_at' => 'datetime',
    ];

    // Relationships
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function messages()
    {
        return $this->hasMany(TicketMessage::class, 'ticket_id')->orderBy('created_at', 'asc');
    }

    public function survey()
    {
        return $this->hasOne(TicketSurvey::class, 'ticket_id');
    }

    public function dailyNotifications()
    {
        return $this->hasMany(TicketDailyNotification::class, 'ticket_id');
    }

    public function aiAnalysis()
    {
        return $this->hasOne(TicketAiAnalysis::class, 'ticket_id');
    }

    // Helpers
    public function isOpen(): bool
    {
        return in_array($this->status, ['open', 'in_progress']);
    }

    public function wasDailyNotificationSentToday(): bool
    {
        return $this->dailyNotifications()
            ->whereDate('notification_date', today())
            ->exists();
    }
}
