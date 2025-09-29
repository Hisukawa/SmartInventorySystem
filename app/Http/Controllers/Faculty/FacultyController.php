<?php

namespace App\Http\Controllers\Faculty;
use App\Models\RoomStatus;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Room;
use App\Models\Equipment;
use App\Models\Peripheral;
use App\Models\SystemUnit;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
class FacultyController extends \App\Http\Controllers\Controller
{


    //Function for Faculty Dashboard
 public function dashboard()
{
    $user = Auth::user();

    // === Active rooms with faculty info ===
    $activeRooms = RoomStatus::where('is_active', 1)
        ->with(['room', 'faculty'])
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
    $conditions = \DB::table('system_units')->select('condition')->distinct()
        ->union(\DB::table('peripherals')->select('condition')->distinct())
        ->union(\DB::table('equipments')->select('condition')->distinct())
        ->pluck('condition')
        ->filter()
        ->unique()
        ->values();

    $conditionCounts = $conditions->map(function ($condition) {
        return [
            'name'  => $condition,
            'value' =>
                \DB::table('system_units')->where('condition', $condition)->count()
                + \DB::table('peripherals')->where('condition', $condition)->count()
                + \DB::table('equipments')->where('condition', $condition)->count(),
        ];
    });

    // === Get Announcements (latest first) ===
    $announcements = \DB::table('announcements')
        ->join('users', 'announcements.created_by', '=', 'users.id')
        ->select('announcements.*', 'users.name as created_by_name')
        ->orderBy('announcements.created_at', 'desc')
        ->limit(5) // show latest 5
        ->get();

    return Inertia::render('Faculty/FacultyDashboard', [
        'user'          => $user,
        'activeRooms'   => $activeRooms,
        'summary'       => [
            'totalRooms'       => $totalRooms,
            'availableRooms'   => $availableRooms,
            'occupiedRooms'    => $occupiedRooms,
            'totalItems'       => $totalItems,
            'systemUnitsTotal' => $systemUnitsTotal,
            'peripheralsTotal' => $peripheralsTotal,
            'equipmentsTotal'  => $equipmentsTotal,
            'conditions'       => $conditionCounts,
        ],
        'announcements' => $announcements,
    ]);
}



    public function showRoom()
    {
        $rooms = Room::with([
                'faculties' => function ($query) {
                    $query->where('role', 'faculty');
                },
                'statuses',
                'latestStatus.faculty'
            ])
            ->orderBy('room_number')
            ->get()
            ->map(function ($room) {
                $latestStatus = $room->latestStatus;

                if ($latestStatus && $latestStatus->is_active) {
                    // Room is active → show faculty and scanned time
                    $room->is_active = true;
                    $room->scanned_at = $latestStatus->created_at;
                    $room->setRelation('faculties', collect([$latestStatus->faculty]));
                } else {
                    // Room is inactive → hide faculty and scanned time
                    $room->is_active = false;
                    $room->scanned_at = null;
                    $room->setRelation('faculties', collect([]));
                }

                return $room;
            })
            ->values();

        return Inertia::render('Faculty/Faculty-Room-Dashboard', [
            'rooms' => $rooms ?? [],
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


    public function dashboardOverview()
    {
        $user = Auth::user();

        // Recent Rooms Visited (last 3)
        $recentRooms = \App\Models\RoomStatus::with('room')
            ->where('scanned_by', $user->id)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(function ($status) {
                return [
                    'room_number' => $status->room->room_number,
                    'scanned_at' => $status->created_at,
                ];
            });

        // Equipment Reports Summary
        $reports = \App\Models\Report::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($report) {
                return [
                    'room_number' => $report->room->room_number,
                    'condition' => $report->condition,
                    'remarks' => $report->remarks,
                    'status' => $report->updated_at ? 'Resolved' : 'Pending',
                    'created_at' => $report->created_at,
                ];
            });

        return Inertia::render('Faculty/FacultyDashboardOverview', [
            'user' => $user,
            'recentRooms' => $recentRooms,
            'reports' => $reports,
        ]);
    }

 public function ShowScannedRoom(Request $request, $encodedRoomPath)
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
    $type      = $request->query('type');

    // Equipments
    $equipments = Equipment::with('room')
        ->where('room_id', $room->id)
        ->when($condition, fn($q) => $q->where('condition', $condition))
        ->when($type, fn($q) => $q->where('type', $type))
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

    // System Units
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

    // Peripherals
    $peripherals = Peripheral::with('unit')
        ->where('room_id', $room->id)
        ->when($condition, fn($q) => $q->where('condition', $condition))
       ->when($type, fn($q) => $q->where('type', $type))
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

    // Filter options
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

    // NEW: Type options
    $typeOptions = collect()
        ->merge(Equipment::select('type')->distinct()->pluck('type'))
        ->merge(Peripheral::select('type')->distinct()->pluck('type'))
        ->unique()
        ->filter()
        ->values();

    return Inertia::render('Faculty/FacultyRoomView', [
        'room' => $room,
        'equipments' => $equipments,
        'systemUnits' => $systemUnits,
        'peripherals' => $peripherals,
        'filters' => [
            'condition' => $condition,
            'unit_code' => $unitCode,
            'type' => $type, // pass the type filter
            'search' => $search,
        ],
        'filterOptions' => [
            'conditions' => $conditionOptions,
            'unit_codes' => $unitCodeOptions,
            'types' => $typeOptions, // pass types to frontend
        ],
        'auth' => ['user' => $user],
        'section' => $request->query('section', 'dashboard'),
    ]);
}

public function ShowFacultyDashboard($encodedRoomPath)
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

    return Inertia::render('Faculty/FacultyScannedRoomDashboard', [
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
