<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $user_id = auth()->user()->id;
        $notifications = Notification::where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();

        $unread_count = Notification::where('user_id', $user_id)->where('is_read', false)->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unread_count
        ], 200);
    }

    public function markAsRead($id)
    {
        $user_id = auth()->user()->id;
        $notification = Notification::where('user_id', $user_id)->findOrFail($id);

        $notification->update(['is_read' => true]);

        return response()->json(['message' => 200]);
    }

    public function markAllAsRead()
    {
        $user_id = auth()->user()->id;
        Notification::where('user_id', $user_id)->where('is_read', false)->update(['is_read' => true]);

        return response()->json(['message' => 200]);
    }
}
