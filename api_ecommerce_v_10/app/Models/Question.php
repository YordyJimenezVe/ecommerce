<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product\Product;
use App\User;

class Question extends Model
{
    protected $fillable = [
        'product_id',
        'user_id',
        'question',
        'answer',
        'answered_at',
    ];

    protected $dates = ['answered_at'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
