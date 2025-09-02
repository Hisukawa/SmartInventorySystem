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
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
                'is_active' => $room->is_active, // ✅ FIXED
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
                'room_path'   => $roomPath,
                'is_active'   => 0, // default inactive
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
 public function show(Request $request, $encodedRoomPath)
{
    $roomPath = urldecode($encodedRoomPath);
    $room = Room::where('room_path', $roomPath)->firstOrFail();

    // ✅ Mark the room active when scanned
     // ✅ Mark the room active when scanned
    if ($room->is_active == 0) {
        $user = Auth::user();

        $room->update([
            'status'            => 'active', 
            'is_active'       => 1,
            'last_scanned_by' => $user ? $user->id : null,
            'last_scanned_at' => now(),
        ]);
    }

    // ✅ Track which room this user activated (fetch actual Eloquent User)
        $userId = Auth::id();
        if ($userId) {
            $user = User::find($userId);
            if ($user) {
                $user->active_room_id = $room->id;
                $user->save();
            }
        }

    // ✅ Filters
    $condition = $request->query('condition');
    $unitCode  = $request->query('unit_code');
    $search    = $request->query('search');

    // ✅ Equipments
 // ✅ Equipments
$equipments = Equipment::with('room') // eager load room relation
    ->where('room_id', $room->id)     // filter by room_id instead of room_number
    ->when($condition, fn($q) => $q->where('condition', $condition))
    ->when($search, fn($q) => $q->where('equipment_code', 'like', "%$search%"))
    ->get()
    ->map(fn ($e) => [
        'id'        => $e->id,
        'name'      => $e->equipment_code,
        'condition' => $e->condition ?? 'Good',
        'type'      => $e->type,
        'room_path' => $room->room_path,
        'room_number' => $e->room?->room_number, // get from relation
    ]);


    // ✅ System Units
    $systemUnits = SystemUnit::where('room_id', $room->id)
        ->when($condition, fn($q) => $q->where('condition', $condition))
       ->when($unitCode, fn($q) => $q->where('unit_code', $unitCode)) // 🔥 ad
        ->when($search, fn($q) => $q->where('unit_code', 'like', "%$search%"))
        ->get()
        ->map(fn ($s) => [
            'id'        => $s->id,
            'name'      => $s->unit_code,
            'condition' => $s->condition ?? 'Good',
            'type'      => $s->type,
            'room_path' => $room->room_path,
        ]);

    // ✅ Peripherals
    $peripherals = Peripheral::where('room_id', $room->id)
        ->when($condition, fn($q) => $q->where('condition', $condition))
        ->when($unitCode, fn($q) => $q->where('unit_code', $unitCode))
        ->when($search, fn($q) => $q->where('peripheral_code', 'like', "%$search%"))
        ->get()
        ->map(fn ($p) => [
            'id'        => $p->id,
            'name'      => $p->peripheral_code,
            'condition' => $p->condition ?? 'Good',
            'type'      => $p->type,
            'room_path' => $room->room_path,
        ]);

    // ✅ Fetch unique filter values (DB-driven, not hardcoded)
    $conditionOptions = collect()
        ->merge(Equipment::select('condition')->distinct()->pluck('condition'))
        ->merge(SystemUnit::select('condition')->distinct()->pluck('condition'))
        ->merge(Peripheral::select('condition')->distinct()->pluck('condition'))
        ->unique()
        ->filter()
        ->values();

    $unitCodeOptions = collect()
        ->merge(SystemUnit::where('room_id', $room->id)->select('unit_code')->distinct()->pluck('unit_code'))
        ->merge(Peripheral::where('room_id', $room->id)->select('unit_code')->distinct()->pluck('unit_code'))
        ->unique()
        ->filter()
        ->values();

    return Inertia::render('Faculty/FacultyRoomView', [
        'room'        => $room,
        'equipments'  => $equipments,
        'systemUnits' => $systemUnits,
        'peripherals' => $peripherals,
        'filters' => [
            'condition' => $condition,
            'unit_code' => $unitCode,
            'search'    => $search,
        ],
        'filterOptions' => [
            'conditions' => $conditionOptions,
            'unit_codes' => $unitCodeOptions,
        ],
        'auth'    => ['user' => Auth::user()],
        'section' => $request->query('section', 'system-units'),
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
        ], [
            'room_number.unique' => 'This room number is already taken.',
        ]);

        $roomNumber = $validated['room_number'];
        $roomPath = "isu-ilagan/ict-department/room-{$roomNumber}";

        $room->update([
            'room_number' => $roomNumber,
            'room_path'   => $roomPath,
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
    $page    = $request->input('page', 1);

    $rooms = Room::with('lastScannedUser') //  load related user
        ->orderBy('id')
        ->paginate($perPage, ['*'], 'page', $page)
        ->through(fn ($room) => [
            'id' => $room->id,
            'name' => 'Room ' . $room->room_number,
            'is_active' => (bool)$room->is_active,
            'last_scanned_by' => $room->is_active && $room->lastScannedUser
                ? $room->lastScannedUser->name // 👈 show faculty name
                : null,
            'role' => $room->is_active && $room->lastScannedUser
                ? $room->lastScannedUser->role // 👈 show faculty role
                : null,
            'last_scanned_at' => $room->is_active
                ? $room->last_scanned_at
                : null,
        ]);

    return response()->json([
        'data' => $rooms->items(),
        'meta' => [
            'current_page' => $rooms->currentPage(),
            'total_pages'  => $rooms->lastPage(),
        ],
    ]);
}


    /**
     * Update room status when QR code is scanned
     */
    public function scanRoom(Request $request, Room $room)
    {
        $room->update([
            'is_active'       => 1,
            'last_scanned_by' => $request->user()->name,
            'last_scanned_at' => Carbon::now(),
        ]);

        $encodedRoomPath = urlencode($room->room_path);
        return redirect()->to("/room/{$encodedRoomPath}");
    }
}
