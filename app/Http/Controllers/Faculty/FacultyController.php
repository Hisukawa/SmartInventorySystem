<?php

namespace App\Http\Controllers\Faculty;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Room;
class FacultyController extends \App\Http\Controllers\Controller
{
    public function dashboard()
    {
        return Inertia::render('Faculty/FacultyDashboard', [
            'user' => Auth::user(),
        ]);
    }

public function showRoom()
{
    $rooms = Room::with(['faculties' => function ($query) {
            $query->where('role', 'faculty');
        }])
        ->orderBy('room_number')
        ->get()
        ->map(function ($room) {
            // If room is inactive → no faculties
            if (!$room->is_active) {
                $room->setRelation('faculties', collect([]));
            } else {
                // Filter faculties: only show the one who scanned it
                $room->setRelation('faculties', $room->faculties->filter(function ($faculty) use ($room) {
                    return $faculty->name === $room->last_scanned_by;
                })->values());
            }
            return $room;
        });

    return Inertia::render('Faculty/Faculty-Room-Dashboard', [
        'rooms' => $rooms,
    ]);
}


public function roomsStatus()
{
    $rooms = Room::with(['faculties' => function ($query) {
            $query->where('role', 'faculty');
        }])
        ->orderBy('room_number')
        ->get()
        ->map(function ($room) {
            if (!$room->is_active) {
                $room->setRelation('faculties', collect([]));
            }
            // Do NOT filter faculties for active rooms
            return $room;
        });

    return response()->json([
        'data' => $rooms
    ]);
}



    
}
