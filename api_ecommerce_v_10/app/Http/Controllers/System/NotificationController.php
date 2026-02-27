<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // ─── Get my notifications ─────────────────────────────────────────────────
    public function index()
    {
        $user = Auth::user();
        $notifications = Notification::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(30)
            ->get();

        $unread_count = Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unread_count,
        ]);
    }

    // ─── Mark one as read ─────────────────────────────────────────────────────
    public function markAsRead($id)
    {
        $user = Auth::user();
        $notification = Notification::where('user_id', $user->id)->findOrFail($id);
        $notification->update(['is_read' => true]);
        return response()->json(['message' => 'Marked as read']);
    }

    // ─── Mark all as read ─────────────────────────────────────────────────────
    public function markAllAsRead()
    {
        $user = Auth::user();
        Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);
        return response()->json(['message' => 'All marked as read']);
    }

    // ─── Delete a notification ────────────────────────────────────────────────
    public function destroy($id)
    {
        $user = Auth::user();
        Notification::where('user_id', $user->id)->findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }

    // ─── Get unread count only (for polling) ─────────────────────────────────
    public function unreadCount()
    {
        $user = Auth::user();
        $count = Notification::where('user_id', $user->id)->where('is_read', false)->count();
        return response()->json(['unread_count' => $count]);
    }

    // ─── ADMIN: Send notification (broadcast) ────────────────────────────────
    // target_type: 'all_companies' | 'company' | 'user' | 'company_staff'
    // target_ids: array of company_ids or user_ids
    public function send(Request $request)
    {
        $user = Auth::user();
        $role = strtolower($user->role ? $user->role->name : '');
        $isSuperAdmin = in_array($role, ['super_admin', 'administrador general', 'soporte']);
        $isCompanyAdmin = str_contains($role, 'admin') || str_contains($role, 'empresa');

        // If neither, forbidden
        if (!$isSuperAdmin && !$isCompanyAdmin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'sometimes|string|in:info,warning,success,danger,ticket,system',
            'icon' => 'sometimes|string',
            'color' => 'sometimes|string',
            'link' => 'sometimes|string|nullable',
            'target_type' => 'required|in:all_companies,company,user,company_staff',
            'target_ids' => 'sometimes|array',
        ]);

        $targetType = $request->target_type;
        $recipientIds = [];

        // Super admin controls
        if ($isSuperAdmin) {
            switch ($targetType) {
                case 'all_companies':
                    // All users that belong to a company
                    $recipientIds = User::whereNotNull('company_id')->pluck('id')->toArray();
                    break;
                case 'company':
                    // All users of specific companies
                    $companyIds = $request->target_ids ?? [];
                    $recipientIds = User::whereIn('company_id', $companyIds)->pluck('id')->toArray();
                    break;
                case 'user':
                    $recipientIds = $request->target_ids ?? [];
                    break;
                case 'company_staff':
                    // Specific users (same as user for super admin)
                    $recipientIds = $request->target_ids ?? [];
                    break;
            }
        }

        // Company admin: can only send to their own staff
        elseif ($isCompanyAdmin) {
            if ($targetType !== 'company_staff') {
                return response()->json(['message' => 'Company admins can only notify their own staff'], 403);
            }
            $allowedIds = User::where('company_id', $user->company_id)->pluck('id')->toArray();
            $requested = $request->target_ids ?? $allowedIds; // if empty, all staff
            $recipientIds = array_intersect($requested, $allowedIds);
        }

        if (empty($recipientIds)) {
            return response()->json(['message' => 'No recipients found', 'sent' => 0]);
        }

        // Bulk insert
        $now = now();
        $base = [
            'sent_by' => $user->id,
            'title' => $request->title,
            'message' => $request->message,
            'type' => $request->type ?? 'info',
            'icon' => $request->icon ?? 'fas fa-bell',
            'color' => $request->color ?? '#6366f1',
            'link' => $request->link,
            'is_read' => false,
            'created_at' => $now,
            'updated_at' => $now,
        ];

        $rows = array_map(fn($uid) => array_merge($base, ['user_id' => $uid]), array_unique($recipientIds));

        // Insert in chunks of 500
        foreach (array_chunk($rows, 500) as $chunk) {
            Notification::insert($chunk);
        }

        Log::info("Notification sent by user {$user->id} to " . count($rows) . " recipients. Type: $targetType");

        return response()->json([
            'message' => 'Notificación enviada exitosamente',
            'sent' => count($rows),
        ]);
    }

    // ─── ADMIN: Get list of users for targeting ───────────────────────────────
    public function getTargets(Request $request)
    {
        $user = Auth::user();
        $role = strtolower($user->role ? $user->role->name : '');
        $isSuperAdmin = in_array($role, ['super_admin', 'administrador general', 'soporte']);

        if ($isSuperAdmin) {
            $companies = Company::select('id', 'name')->orderBy('name')->get();
            $staff = User::whereNull('company_id')->select('id', 'name', 'surname', 'email')->orderBy('name')->get();
            return response()->json(['companies' => $companies, 'staff' => $staff]);
        }

        // Company admin: return their own staff
        $staff = User::where('company_id', $user->company_id)
            ->where('id', '!=', $user->id)
            ->select('id', 'name', 'surname', 'email')
            ->orderBy('name')
            ->get();

        return response()->json(['staff' => $staff]);
    }

    // ─── ADMIN: Get sent notifications history ────────────────────────────────
    public function sentHistory()
    {
        $user = Auth::user();
        $role = strtolower($user->role ? $user->role->name : '');

        if (in_array($role, ['super_admin', 'administrador general'])) {
            // Super admin sees all sent
            $sent = Notification::whereNotNull('sent_by')
                ->with('sender:id,name,surname')
                ->select('title', 'message', 'type', 'sent_by', 'created_at')
                ->selectRaw('COUNT(*) as recipients')
                ->groupBy('title', 'message', 'type', 'sent_by', 'created_at')
                ->orderByDesc('created_at')
                ->limit(50)
                ->get();
        } else {
            $sent = Notification::where('sent_by', $user->id)
                ->select('title', 'message', 'type', 'sent_by', 'created_at')
                ->selectRaw('COUNT(*) as recipients')
                ->groupBy('title', 'message', 'type', 'sent_by', 'created_at')
                ->orderByDesc('created_at')
                ->limit(20)
                ->get();
        }

        return response()->json($sent);
    }

    // ─── Helper: Create single notification (used by other controllers) ───────
    public static function createFor(int $userId, string $title, string $message, string $type = 'info', ?string $link = null, ?int $sentBy = null, string $icon = 'fas fa-bell', string $color = '#6366f1'): void
    {
        Notification::create([
            'user_id' => $userId,
            'sent_by' => $sentBy,
            'title' => $title,
            'message' => $message,
            'type' => $type,
            'link' => $link,
            'icon' => $icon,
            'color' => $color,
            'is_read' => false,
        ]);
    }
}
