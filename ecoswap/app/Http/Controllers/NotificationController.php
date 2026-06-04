<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = auth()->user()
            ->notifications()
            ->latest()
            ->get(['id', 'message', 'type', 'read', 'created_at']);

        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications,
        ]);
    }

    /**
     * Mark a notification as read.
     */
    public function update(Request $request, Notification $notification)
    {
        abort_if($notification->user_id !== auth()->id(), 403);

        $notification->update(['read' => true]);

        return back();
    }
}
