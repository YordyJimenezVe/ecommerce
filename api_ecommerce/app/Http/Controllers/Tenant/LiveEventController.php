<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LiveEvent;
use Illuminate\Support\Facades\Auth;

class LiveEventController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware(\App\Http\Middleware\TenantMiddleware::class);
    }

    public function index()
    {
        // Automatically scoped by TenantMiddleware logic if we apply scope manually or if relation is used
        // But better to use explicit relationship or scope.
        // Assuming TenantScope is applied globally in LiveEvent model, simplified here:
        $user = Auth::user();
        if ($user->role === 'super_admin') {
            $events = LiveEvent::all();
        } else {
            $events = LiveEvent::where('company_id', $user->company_id)->get();
        }

        return response()->json(['events' => $events], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'scheduled_at' => 'required|date',
        ]);

        $user = Auth::user();

        $event = LiveEvent::create([
            'company_id' => $user->company_id,
            'title' => $request->title,
            'description' => $request->description,
            'embed_url' => $request->embed_url,
            'scheduled_at' => $request->scheduled_at,
            'status' => 'scheduled'
        ]);

        return response()->json(['message' => 'Event scheduled', 'event' => $event], 201);
    }

    // update, destroy...
}
