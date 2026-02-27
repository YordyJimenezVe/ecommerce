<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AIKnowledge extends Model
{
    use HasFactory;

    protected $table = 'ai_knowledges';

    protected $fillable = [
        'question',
        'answer',
        'category',
        'priority',
        'company_id',
        'is_admin_only',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
