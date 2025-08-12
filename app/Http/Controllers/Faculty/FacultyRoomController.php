<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class FacultyRoomController extends Controller
{
    public function show($room_path)
    {
        $room = Room::with('equipments')
            ->where('room_path', $room_path)
            ->firstOrFail();

        return inertia('Faculty/FacultyRoomView', [
            'room' => $room
        ]);
    }
}
