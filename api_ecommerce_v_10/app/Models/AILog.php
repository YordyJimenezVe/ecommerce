<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AILog extends Model
{
    use HasFactory;

    protected $table = 'ai_logs';

    protected $fillable = [
        'user_id',
        'query',
        'response',
        'was_answered',
        'was_helpful',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
