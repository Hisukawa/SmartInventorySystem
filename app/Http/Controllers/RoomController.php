<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $rooms = Room::when($search, function ($query, $search) {
                $query->where('room_number', 'like', "%$search%")
                    ->orWhere('room_path', 'like', "%$search%");
            })
            ->orderBy('id')
            ->paginate(10)
            ->through(fn ($room) => [
                'id' => $room->id,
                'room_number' => $room->room_number,
                'room_path' => $room->room_path, // used for generating QR
            ])
            ->withQueryString();

        return Inertia::render('Admin/RoomPage', [
            'rooms' => $rooms,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number' => 'required|string|max:255',
        ]);

        $roomPath = 'isu-ilagan/ict-department/room-' . strtolower($validated['room_number']);

        $room = Room::create([
            'room_number' => $validated['room_number'],
            'room_path' => $roomPath,
        ]);

        // Optional: generate QR code here later

        return redirect()->back()->with('success', 'Room added.');
    }

    public function show(Room $room) { /* ... */ }
    public function edit(Room $room) { /* ... */ }
    public function update(Request $request, Room $room) { /* ... */ }
    public function destroy(Room $room) { /* ... */ }
}
