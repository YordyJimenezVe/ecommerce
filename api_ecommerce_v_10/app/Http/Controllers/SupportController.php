<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SupportConversation;
use App\Models\SupportMessage;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SupportController extends Controller
{
    public function getConversations(Request $request)
    {
        $user = auth('api')->user();

        $conversations = SupportConversation::where('user_a_id', $user->id)
            ->orWhere('user_b_id', $user->id)
            ->with([
                'userA',
                'userB',
                'messages' => function ($q) {
                    $q->latest()->limit(1);
                }
            ])
            ->get();

        return response()->json([
            'conversations' => $conversations
        ]);
    }

    public function getMessages($id)
    {
        $user = auth('api')->user();
        $conversation = SupportConversation::findOrFail($id);

        if ($conversation->user_a_id !== $user->id && $conversation->user_b_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $messages = SupportMessage::where('conversation_id', $id)
            ->with('sender')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'messages' => $messages
        ]);
    }

    public function sendMessage(Request $request)
    {
        $user = auth('api')->user();
        $request->validate([
            'conversation_id' => 'required',
            'message' => 'required'
        ]);

        $message = SupportMessage::create([
            'conversation_id' => $request->conversation_id,
            'sender_id' => $user->id,
            'message' => $request->message,
            'is_read' => false
        ]);

        return response()->json([
            'message' => $message->load('sender')
        ]);
    }

    public function startConversation(Request $request)
    {
        $user = auth('api')->user();
        $request->validate([
            'to_user_id' => 'required',
            'type' => 'nullable'
        ]);

        // Check if conversation already exists
        $conversation = SupportConversation::where(function ($q) use ($user, $request) {
            $q->where('user_a_id', $user->id)->where('user_b_id', $request->to_user_id);
        })->orWhere(function ($q) use ($user, $request) {
            $q->where('user_a_id', $request->to_user_id)->where('user_b_id', $user->id);
        })->first();

        if (!$conversation) {
            $conversation = SupportConversation::create([
                'user_a_id' => $user->id, // If admin
                'user_b_id' => $request->to_user_id,
                'type' => $request->type ?? 'support',
                'status' => 'open'
            ]);
        }

        return response()->json([
            'conversation' => $conversation->load(['userA', 'userB'])
        ]);
    }
}
