<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Equipment;
use App\Models\Peripheral;
use App\Models\SystemUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;
use Carbon\Carbon;

class RoomController extends Controller
{
    /**
     * Display a listing of rooms (Admin RoomPage)
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
                'room_path' => $room->room_path,
                'status' => $room->status,
                'last_scanned_by' => $room->last_scanned_by,
                'last_scanned_at' => $room->last_scanned_at,
            ])
            ->withQueryString();

        return Inertia::render('Admin/RoomPage', [
            'rooms' => $rooms,
            'search' => $search,
        ]);
    }

    /**
     * Show form for creating a new room
     */
    public function create()
    {
        return Inertia::render('Admin/Rooms/AddRoomPage');
    }

    /**
     * Store a newly created room
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number' => 'required|integer|unique:rooms,room_number',
        ]);

        $roomNumber = $validated['room_number'];
        $roomPath = "isu-ilagan/ict-department/room-{$roomNumber}";
        $encodedRoomPath = urlencode($roomPath);

        try {
            $room = Room::create([
                'room_number' => $roomNumber,
                'room_path' => $roomPath,
            ]);

            $qrUrl = url("/room/{$encodedRoomPath}");

            return redirect()->back()->with('qrUrl', $qrUrl);
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

    /**
     * Show Room Dashboard when QR code is scanned
     */
    public function show($encodedRoomPath)
    {
        $roomPath = urldecode($encodedRoomPath);
        $room = Room::where('room_path', $roomPath)->firstOrFail();

        // Fetch related items and include room_path for display
        $equipments = Equipment::where('room_number', $room->room_number)
            ->get()
            ->map(fn ($e) => [
                'id' => $e->id,
                'name' => $e->equipment_code, // use equipment_code
                'condition' => $e->condition ?? 'Good',
                'type' => 'Equipment',
                'room_path' => $room->room_path,
            ]);

        $systemUnits = SystemUnit::where('room_id', $room->id)
            ->get()
            ->map(fn ($s) => [
                'id' => $s->id,
                'name' => $s->unit_code, // use unit_code
                'condition' => $s->condition ?? 'Good',
                'type' => 'System Unit',
                'room_path' => $room->room_path,
            ]);

        $peripherals = Peripheral::where('room_id', $room->id)
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->peripheral_code, // use peripheral_code
                'condition' => $p->condition ?? 'Good',
                'type' => 'Peripheral',
                'room_path' => $room->room_path,
            ]);

        return Inertia::render('Faculty/FacultyRoomView', [
            'room' => $room,
            'equipments' => $equipments,
            'systemUnits' => $systemUnits,
            'peripherals' => $peripherals,
            'auth' => [
                'user' => auth()->user(),
            ],

            'section' => request()->query('section', 'system-units')
        ]);
    }


    /**
     * Show form to edit a room
     */
    public function edit(Room $room)
    {
        return Inertia::render('Admin/EditRoomForm', [
            'room' => $room,
        ]);
    }

    /**
     * Update room info
     */
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'room_number' => 'required|integer|unique:rooms,room_number,' . $room->id,
        ]);

        $roomNumber = $validated['room_number'];
        $roomPath = "isu-ilagan/ict-department/room-{$roomNumber}";

        $room->update([
            'room_number' => $roomNumber,
            'room_path' => $roomPath,
        ]);

        return redirect()->route('rooms.index')->with('success', 'Room updated.');
    }

    /**
     * Delete a room
     */
    public function destroy(Room $room)
    {
        $room->delete();

        return redirect()->back()->with('success', 'Room deleted.');
    }

    /**
     * API: Return rooms status for Admin Dashboard
     */
    public function getRoomStatus(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $rooms = Room::orderBy('id')
            ->paginate($perPage, ['*'], 'page', $page)
            ->through(fn ($room) => [
                'id' => $room->id,
                'name' => 'Room ' . $room->room_number,
                'status' => $room->status,
                'last_scanned_by' => $room->last_scanned_by,
                'last_scanned_at' => $room->last_scanned_at,
            ]);

        return response()->json([
            'data' => $rooms->items(),
            'meta' => [
                'current_page' => $rooms->currentPage(),
                'total_pages' => $rooms->lastPage(),
            ],
        ]);
    }

    /**
     * Update room status when QR code is scanned
     */
    public function scanRoom(Request $request, Room $room)
    {
        $room->update([
            'status' => 'active',
            'last_scanned_by' => $request->user()->name,
            'last_scanned_at' => Carbon::now(),
        ]);

        $encodedRoomPath = urlencode($room->room_path);
        return redirect()->to("/room/{$encodedRoomPath}");
    }
}
