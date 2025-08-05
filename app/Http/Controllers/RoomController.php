<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;


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
            'room_number' => 'required|integer|unique:rooms,room_number',
        ]);

        $roomNumber = $validated['room_number'];
        $roomPath = "isu-ilagan/ict-department/room-{$roomNumber}";

        try {
            Room::create([
                'room_number' => $roomNumber,
                'room_path' => $roomPath,
            ]);

            return redirect()->back(); // onSuccess will be triggered
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') {
                return back()->withErrors([
                    'room_number' => 'Room number already exists.',
                ]);
            }

            return back()->withErrors([
                'room_number' => 'An unexpected error occurred.',
            ]);
        }
    }

    public function show(Room $room) { /* ... */ }
    // GET /admin/rooms/{room}/edit

    public function edit(Room $room)
    {
        return Inertia::render('Admin/EditRoomForm', [
            'room' => $room,
        ]);
    }

    // PUT /admin/rooms/{room}
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'room_number' => 'required|string|max:255',
        ]);

        $room->update([
            'room_number' => $validated['room_number'],
            'room_path' => 'isu-ilagan/ict-department/room-' . strtolower($validated['room_number']),
        ]);

        return redirect()->route('rooms.index')->with('success', 'Room updated.');
    }

    // DELETE /admin/rooms/{room}
    public function destroy(Room $room)
    {
        $room->delete();

        return redirect()->back()->with('success', 'Room deleted.');
    }
}
