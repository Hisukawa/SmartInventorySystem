<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

use App\Http\Controllers\SystemUnitController;
use const Dom\SYNTAX_ERR;

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

    public function showUnit(Room $room, SystemUnitController $unit)
{
    return inertia('Faculty/FacultyUnitView', [
        'room' => $room,
        'unit' => $unit,
        'user' => auth()->user(),
    ]);
}

}
