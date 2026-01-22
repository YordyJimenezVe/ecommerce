<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Product\Product;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        // TenantMiddleware ensures company context, but we need meaningful checks
        $this->middleware(\App\Http\Middleware\TenantMiddleware::class);
    }

    public function index()
    {
        $user = Auth::user();
        // Get questions for products belonging to this company
        $questions = Question::whereHas('product', function ($q) use ($user) {
            $q->where('company_id', $user->company_id);
        })->orderBy('created_at', 'desc')->get();

        return response()->json(['questions' => $questions], 200);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $question = Question::findOrFail($id);

        // Security: Ensure the product belongs to the user's company
        if ($question->product->company_id != $user->company_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'answer' => 'required|string'
        ]);

        $question->update([
            'answer' => $request->answer,
            'answered_at' => now(),
        ]);

        return response()->json(['message' => 'Answer posted', 'question' => $question]);
    }
}
