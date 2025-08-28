<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;



use App\Models\SystemUnit;
use const Dom\SYNTAX_ERR;

class FacultyRoomController extends Controller
{
public function show($room_path)
{
    $room = Room::where('room_path', $room_path)
        ->with(['equipments', 'systemUnits', 'peripherals'])
        ->firstOrFail();

    return Inertia::render('Faculty/FacultyRoomView', [
        'room' => $room,
        'equipments' => $room->equipments,
        'systemUnits' => $room->systemUnits,
        'peripherals' => $room->peripherals,
        'user' => Auth::user(),
    ]);
}

public function showUnit(Room $room, SystemUnit $unit)
{
    $room->load(['equipments', 'systemUnits', 'peripherals']);

    return Inertia::render('Faculty/FacultyUnitView', [
        'room' => $room,
        'unit' => $unit,
        'user' => Auth::user(),
        'equipments' => $room->equipments,
        'systemUnits' => $room->systemUnits,
        'peripherals' => $room->peripherals,
    ]);
}



}
