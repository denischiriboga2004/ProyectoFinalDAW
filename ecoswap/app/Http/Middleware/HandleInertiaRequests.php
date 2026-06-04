<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $notifications = [];
        $unreadNotificationsCount = 0;

        if ($user) {
            $unreadNotificationsCount = $user->notifications()
                ->where('read', false)
                ->count();

            $notifications = $user->notifications()
                ->where('read', false)
                ->latest()
                ->take(5)
                ->get(['id', 'message', 'read', 'created_at'])
                ->map(function ($notification) {
                    return [
                        'id' => $notification->id,
                        'message' => $notification->message,
                        'read' => $notification->read,
                        'created_at' => $notification->created_at->diffForHumans(),
                    ];
                });
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user
                    ? [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role_id' => $user->role_id,
                        'unread_notifications_count' => $unreadNotificationsCount,
                        'unread_notifications' => $notifications,
                    ]
                    : null,
            ],
        ];
    }
}
