<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomStatus;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;

use App\Models\Equipment;
use App\Models\Peripheral;
use App\Models\SystemUnit;
use Illuminate\Http\Request;
class GuestDashboardController extends Controller
{
    public function dashboard()
    {
        // === Active rooms with faculty info ===
        $activeRooms = RoomStatus::where('is_active', 1)
            ->with(['room', 'guest'])
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($status) {
                return [
                    'room_number'   => $status->room->room_number,
                    'room_id'       => $status->room->id,
                    'faculty_name'  => $status->faculty->name ?? 'Unknown',
                    'faculty_photo' => $status->faculty->photo ?? null,
                    'scanned_at'    => $status->updated_at,
                ];
            });

        // === Room Stats ===
        $totalRooms     = Room::count();
        $occupiedRooms  = RoomStatus::where('is_active', 1)->count();
        $availableRooms = $totalRooms - $occupiedRooms;

        // === Item Counts ===
        $systemUnitsTotal = DB::table('system_units')->count();
        $peripheralsTotal = DB::table('peripherals')->count();
        $equipmentsTotal  = DB::table('equipments')->count();

        $totalItems = $systemUnitsTotal + $peripheralsTotal + $equipmentsTotal;

        // === Dynamic Equipment Conditions ===
        $conditions = DB::table('system_units')->select('condition')->distinct()
            ->union(DB::table('peripherals')->select('condition')->distinct())
            ->union(DB::table('equipments')->select('condition')->distinct())
            ->pluck('condition')
            ->filter()
            ->unique()
            ->values();

        $conditionCounts = $conditions->map(function ($condition) {
            return [
                'name'  => $condition,
                'value' =>
                    DB::table('system_units')->where('condition', $condition)->count()
                + DB::table('peripherals')->where('condition', $condition)->count()
                + DB::table('equipments')->where('condition', $condition)->count(),
            ];
        });

        return Inertia::render('Guest/GuestDashboard', [
            'activeRooms' => $activeRooms,
            'summary'     => [
                'totalRooms'       => $totalRooms,
                'availableRooms'   => $availableRooms,
                'occupiedRooms'    => $occupiedRooms,
                'totalItems'       => $totalItems,
                'systemUnitsTotal' => $systemUnitsTotal,
                'peripheralsTotal' => $peripheralsTotal,
                'equipmentsTotal'  => $equipmentsTotal,
                'workingItems'     => $conditionCounts->where('name', 'functional')->sum('value'),
                'itemsWorkingPercent' => $totalItems > 0
                    ? round(($conditionCounts->where('name', 'functional')->sum('value') / $totalItems) * 100, 1)
                    : 0,
                'conditions'       => $conditionCounts,
            ],
        ]);
    }


     public function ShowScannedRoom(Request $request, $roomPath){
  $roomPath = urldecode($roomPath); // decode URL path
    $room = Room::where('room_path', $roomPath)->firstOrFail();
    $user = Auth::user();

    RoomStatus::updateOrCreate(
        ['room_id' => $room->id],
        ['scanned_by' => $user->id ?? null, 'is_active' => 1]
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

        return Inertia::render('Guest/GuestScannedRoomView', [
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
            'section' => $request->query('section', 'dashboard'),
        ]);
    }

    public function showUnit(Room $room, SystemUnit $unit)
{
    $room->load(['equipments', 'systemUnits', 'peripherals']);

    return Inertia::render('Guest/GuestUnitView', [
        'room' => $room,
        'unit' => $unit,
        'user' => Auth::user(),
        'equipments' => $room->equipments,
        'systemUnits' => $room->systemUnits,
        'peripherals' => $room->peripherals,
    ]);
}

public function showPeripherals(Room $room, Peripheral $peripheral)
{
    return Inertia::render('Guest/GuestPeripheralsView', [
        'room' => $room,
        'peripheral' => $peripheral,
        'user' => Auth::user(),
        'equipments' => $room->equipments,
        'systemUnits' => $room->systemUnits,
        'peripherals' => $room->peripherals,
    ]);
}
public function showRoomEquipments(Room $room, Equipment $equipment)
{
    if ($equipment->room_id !== $room->id) {
        abort(404, 'Equipment not found in this room.');
    }

    $room->load(['equipments', 'systemUnits', 'peripherals']);

    return Inertia::render('Guest/GuestEquipmentView', [
        'room'        => $room,
        'equipment'   => $equipment,
        'user'        => Auth::user(),
        'equipments'  => $room->equipments,
        'systemUnits' => $room->systemUnits,
        'peripherals' => $room->peripherals,
    ]);
}


public function ShowGuestDashboard($encodedRoomPath)
{
    $roomPath = urldecode($encodedRoomPath);
    $room = Room::where('room_path', $roomPath)->firstOrFail();
    $user = Auth::user();

    // Computers
    $systemUnits = SystemUnit::where('room_id', $room->id)->get();
    $computersCount = $systemUnits->count();
    $computersByCondition = $systemUnits->groupBy('condition')->map->count();

    // Peripherals
    $peripherals = Peripheral::where('room_id', $room->id)->get();
    $peripheralsCount = $peripherals->count();
    $peripheralsByType = $peripherals->groupBy('type')->map->count();
    $peripheralsByCondition = $peripherals->groupBy('condition')->map->count();

    // Group conditions by type for drill-down
    $peripheralsByTypeCondition = [];
    foreach ($peripheralsByType->keys() as $type) {
        $peripheralsByTypeCondition[$type] = $peripherals
            ->where('type', $type)
            ->groupBy('condition')
            ->map->count();
    }

    // Equipments
    $equipments = Equipment::where('room_id', $room->id)->get();
    $equipmentsCount = $equipments->count();
    // Group by equipment_name instead of type
    $equipmentsByName = $equipments->groupBy('equipment_name')->map->count();
    $equipmentsByCondition = $equipments->groupBy('condition')->map->count();

    // Group conditions by equipment_name for drill-down
    $equipmentsByNameCondition = [];
    foreach ($equipmentsByName->keys() as $name) {
        $equipmentsByNameCondition[$name] = $equipments
            ->where('equipment_name', $name)
            ->groupBy('condition')
            ->map->count();
    }

    return Inertia::render('Guest/Guest-Scanned-Dashboard', [
        'room' => $room,
        'user' => $user,
        'stats' => [
            'computers' => [
                'total' => $computersCount,
                'by_condition' => $computersByCondition,
            ],
            'peripherals' => [
                'total' => $peripheralsCount,
                'by_type' => $peripheralsByType,
                'by_condition' => $peripheralsByCondition,
                'by_type_condition' => $peripheralsByTypeCondition,
            ],
            'equipments' => [
                'total' => $equipmentsCount,
                'by_name' => $equipmentsByName, // updated key
                'by_condition' => $equipmentsByCondition,
                'by_name_condition' => $equipmentsByNameCondition, // updated key
            ],
        ],
    ]);
}

}

