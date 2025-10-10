<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Room;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    // Show all notifications for the logged-in user
    public function index()
    {
        $notifications = Auth::user()->unreadNotifications->map(function ($notif) {
            // Convert data to array
            $data = (array) $notif->data;

            // Add room_number if room_id exists
            if (isset($data['room_id'])) {
                $room = \App\Models\Room::find($data['room_id']);
                $data['room_number'] = $room ? $room->room_number : 'N/A';
            } else {
                $data['room_number'] = 'N/A';
            }

            // Return notification with modified data
            return [
                'id' => $notif->id,
                'type' => $notif->type,
                'data' => $data,
                'read_at' => $notif->read_at,
                'created_at' => $notif->created_at,
                'updated_at' => $notif->updated_at,
            ];
        });

        return response()->json($notifications);
    }



    // Mark one notification as read
    public function markAsRead($id)
    {
        $notification = Auth::user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        return response()->json(['success' => true]);
    }

    // Mark all notifications as read
    public function markAllAsRead()
    {
        $user = Auth::user();
        $user->unreadNotifications->markAsRead();

        return response()->json(['success' => true]);
    }
}
