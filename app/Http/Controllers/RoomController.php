<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Equipment;
use App\Models\Peripheral;
use App\Models\SystemUnit;
use App\Models\RoomStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    /**
     * Display a listing of rooms (Admin RoomPage)
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $rooms = Room::with(['latestStatus.scannedBy'])
            ->when($search, function ($query, $search) {
                $query->where('room_number', 'like', "%$search%")
                      ->orWhere('room_path', 'like', "%$search%");
            })
            ->orderBy('id')
            ->paginate(10)
            ->through(fn ($room) => [
                'id'              => $room->id,
                'room_number'     => $room->room_number,
                'room_path'       => $room->room_path,
                'is_active'       => $room->latestStatus?->is_active ?? 0,
                'last_scanned_by' => $room->latestStatus?->scannedBy?->name,
                'last_scanned_at' => $room->latestStatus?->created_at,
            ])
            ->withQueryString();

        return Inertia::render('Admin/RoomPage', [
            'rooms'  => $rooms,
            'search' => $search,
        ]);
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
        $roomPath   = "isu-ilagan/ict-department/room-{$roomNumber}";

        try {
            $room = Room::create([
                'room_number' => $roomNumber,
                'room_path'   => $roomPath,
            ]);

            $qrUrl = url("/room/" . urlencode($roomPath));

            return redirect()->back()->with('qrUrl', $qrUrl);
        } catch (\Exception $e) {
            return back()->withErrors([
                'room_number' => 'Room number already exists or unexpected error.',
            ]);
        }
    }

    /**
     * Update an existing room
     */
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'room_number' => 'required|integer|unique:rooms,room_number,' . $room->id,
        ]);

        $roomNumber = $validated['room_number'];
        $roomPath   = "isu-ilagan/ict-department/room-{$roomNumber}";

        $room->update([
            'room_number' => $roomNumber,
            'room_path'   => $roomPath,
        ]);

        return redirect()->back()->with('success', "Room updated successfully.");
    }

    /**
     * Delete a room
     */
    public function destroy(Room $room)
    {
        $room->delete();

        return redirect()->back()->with('success', "Room deleted successfully.");
    }

    /**
     * Show Room Dashboard when QR code is scanned
     */
    public function show(Request $request, $encodedRoomPath)
    {
        $roomPath = urldecode($encodedRoomPath);
        $room     = Room::where('room_path', $roomPath)->firstOrFail();
        $user     = Auth::user();

        RoomStatus::updateOrCreate(
            ['room_id' => $room->id],
            ['scanned_by' => $user?->id, 'is_active' => 1]
        );

        $condition = $request->query('condition');
        $unitCode  = $request->query('unit_code');
        $search    = $request->query('search');

        $equipments = Equipment::with('room')
            ->where('room_id', $room->id)
            ->when($condition, fn($q) => $q->where('condition', $condition))
            ->when($search, fn($q) => $q->where('equipment_code', 'like', "%$search%"))
            ->get()
            ->map(fn($e) => [
                'id' => $e->id,
                'name' => $e->equipment_code,
                'condition' => $e->condition ?? 'Good',
                'type' => $e->type,
                'room_path' => $room->room_path,
                'room_number' => $e->room?->room_number,
            ]);

        $systemUnits = SystemUnit::where('room_id', $room->id)
            ->when($condition, fn($q) => $q->where('condition', $condition))
            ->when($unitCode, fn($q) => $q->where('unit_code', $unitCode))
            ->when($search, fn($q) => $q->where('unit_code', 'like', "%$search%"))
            ->get()
            ->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->unit_code,
                'condition' => $s->condition ?? 'Good',
                'room_path' => $room->room_path,
            ]);

        $peripherals = Peripheral::with('unit')
            ->where('room_id', $room->id)
            ->when($condition, fn($q) => $q->where('condition', $condition))
            ->when($unitCode, fn($q) => $q->whereHas('unit', fn($sub) => $sub->where('unit_code', $unitCode)))
            ->when($search, fn($q) => $q->where('peripheral_code', 'like', "%$search%"))
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->peripheral_code,
                'condition' => $p->condition ?? 'Good',
                'type' => $p->type,
                'room_path' => $room->room_path,
                'unit_code' => $p->unit?->unit_code,
            ]);

        $conditionOptions = collect()
            ->merge(Equipment::select('condition')->distinct()->pluck('condition'))
            ->merge(SystemUnit::select('condition')->distinct()->pluck('condition'))
            ->merge(Peripheral::select('condition')->distinct()->pluck('condition'))
            ->unique()
            ->filter()
            ->values();

        $unitCodeOptions = SystemUnit::where('room_id', $room->id)
            ->select('unit_code')
            ->distinct()
            ->pluck('unit_code');

        return Inertia::render('Faculty/FacultyRoomView', [
            'room' => $room,
            'equipments' => $equipments,
            'systemUnits' => $systemUnits,
            'peripherals' => $peripherals,
            'filters' => [
                'condition' => $condition,
                'unit_code' => $unitCode,
                'search' => $search,
            ],
            'filterOptions' => [
                'conditions' => $conditionOptions,
                'unit_codes' => $unitCodeOptions,
            ],
            'auth' => ['user' => $user],
            'section' => $request->query('section', 'system-units'),
        ]);
    }

    /**
     * API: Return rooms status for Admin Dashboard
     */
    public function getRoomStatus(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page    = $request->input('page', 1);

        $rooms = Room::with(['latestStatus.scannedBy'])
            ->orderBy('id')
            ->paginate($perPage, ['*'], 'page', $page)
            ->through(fn ($room) => [
                'id' => $room->id,
                'name' => 'Room ' . $room->room_number,
                'is_active' => (bool) ($room->latestStatus?->is_active ?? 0),
                'last_scanned_user' => $room->latestStatus?->scannedBy
                    ? [
                        'name' => $room->latestStatus->scannedBy->name,
                        'role' => $room->latestStatus->scannedBy->role,
                        'photo' => $room->latestStatus->scannedBy->photo
                            ? asset('storage/' . $room->latestStatus->scannedBy->photo)
                            : null,
                    ]
                    : null,
                'last_scanned_at' => $room->latestStatus?->created_at,
            ]);

        return response()->json([
            'data' => $rooms->items(),
            'meta' => [
                'current_page' => $rooms->currentPage(),
                'total_pages' => $rooms->lastPage(),
            ],
        ]);
    }
}
