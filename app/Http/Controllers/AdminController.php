<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Peripheral;
use App\Models\Report;
use App\Models\Room;
use App\Models\SystemUnit;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/AdminDashboard', [
            'user' => Auth::user(),
        ]);
    }

    // 📊 Main stats
    public function dashboardStats()
    {
        return response()->json([
            'totalRooms'       => Room::count(),
            'totalSystemUnits' => SystemUnit::count(),
            'totalPeripherals' => Peripheral::count(),
            'totalEquipments'  => Equipment::count(),
            'occupiedRooms'    => Room::whereHas('latestStatus', fn($q) => $q->where('is_active', true))->count(),
            'pendingRequests'  => Report::where('condition', '!=', 'Resolved')->count(),
            'forRepair'        => Report::whereIn('condition', ['For Repair', 'Defective'])->count(),
            'availablePeripherals' => Peripheral::where('condition', 'Good')->count(),
            'activeUsers'      => User::whereNotNull('email_verified_at')->count(),
            'totalUsers'       => User::count(),
        ]);
    }

    // 📝 Recent activity logs
    public function activityLogs()
    {
        $logs = Report::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($report) => [
                'user'      => $report->user?->name ?? 'Unknown',
                'action'    => $report->condition . ' - ' . ($report->remarks ?? 'No remarks'),
                'timestamp' => $report->created_at->format('Y-m-d H:i'),
            ]);

        return response()->json($logs);
    }

    // 🔧 Pending maintenance requests
    public function maintenanceRequests()
    {
        $requests = Report::where('condition', '!=', 'Resolved')
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($report) => [
                'equipment'   => 'EQP-' . $report->reportable_id,
                'issue'       => $report->condition,
                'reported_by' => $report->user?->name ?? 'Unknown',
            ]);

        return response()->json($requests);
    }

    // 🏫 Room occupancy widget
   public function roomsStatus()
{
    $rooms = Room::with(['latestStatus.scannedBy'])->get();

    $occupiedCount = 0;
    $availableCount = 0;
    $details = [];

    foreach ($rooms as $room) {
        $isActive = (bool) ($room->latestStatus->is_active ?? false);

        if ($isActive) $occupiedCount++;
        else $availableCount++;

        // Build faculty photo URL properly
        $facultyPhoto = null;
        if ($room->latestStatus?->scannedBy?->photo) {
            $facultyPhoto = asset($room->latestStatus->scannedBy->photo);
        }

        $details[] = [
            'id'              => $room->id,
            'room_number'     => $room->room_number,
            'is_active'       => $isActive,
            'last_scanned_by' => $room->latestStatus?->scannedBy?->name,
            'last_scanned_at' => $room->latestStatus?->created_at,
            'faculty_photo'   => $facultyPhoto,
        ];
    }

    return response()->json([
        'occupied'  => $occupiedCount,
        'available' => $availableCount,
        'details'   => $details,
    ]);
}


    // 🖥 Overall equipment condition (all rooms)
// 🖥 Overall equipment condition (all rooms or filtered by room)
public function equipmentCondition(Request $request)
{
    $roomId = $request->query('room_id');

    // System Units
    $systemUnitsQuery = SystemUnit::query();
    if ($roomId) $systemUnitsQuery->where('room_id', $roomId);
    $systemUnits = $systemUnitsQuery->select('condition')->get()
        ->groupBy('condition')
        ->map->count()
        ->toArray();

    // Peripherals
    $peripheralsQuery = Peripheral::query();
    if ($roomId) $peripheralsQuery->where('room_id', $roomId);
    $peripherals_typeQuery = Peripheral::query();
    if ($roomId) $peripherals_typeQuery->where('room_id', $roomId);

    $peripherals = $peripheralsQuery->select('condition')->get()
        ->groupBy('condition')
        ->map->count()
        ->toArray();

    $peripherals_type = $peripherals_typeQuery->select('type', 'condition')->get()
        ->groupBy('type')
        ->map(fn($group) => $group->count())
        ->toArray();

    // Equipments
    $equipmentsQuery = Equipment::query();
    if ($roomId) $equipmentsQuery->where('room_id', $roomId);
    $equipments = $equipmentsQuery->select('condition')->get()
        ->groupBy('condition')
        ->map->count()
        ->toArray();

    return response()->json([
        'system_units'     => $systemUnits,
        'peripherals'      => $peripherals,
        'peripherals_type' => $peripherals_type,
        'equipments'       => $equipments,
    ]);
}

    // 🖥 Filtered equipment condition by room/type
    public function equipmentConditionFiltered(Request $request)
    {
        $roomId = $request->query('room_id');
        $type   = $request->query('type');

        // Computers (SystemUnits)
        $systemUnitsQuery = SystemUnit::query();
        if ($roomId) $systemUnitsQuery->where('room_id', $roomId);
        $systemUnits = $systemUnitsQuery->select('condition')->get()
            ->groupBy('condition')
            ->map->count()
            ->toArray();

        // Peripherals
        $peripheralsQuery = Peripheral::query();
        if ($roomId) $peripheralsQuery->where('room_id', $roomId);
        if ($type)   $peripheralsQuery->where('type', $type);
        $peripherals = $peripheralsQuery->select('condition')->get()
            ->groupBy('condition')
            ->map->count()
            ->toArray();

        // Equipments
        $equipmentsQuery = Equipment::query();
        if ($roomId) $equipmentsQuery->where('room_id', $roomId);
        if ($type)   $equipmentsQuery->where('type', $type);
        $equipments = $equipmentsQuery->select('condition')->get()
            ->groupBy('condition')
            ->map->count()
            ->toArray();

        return response()->json([
            'system_units' => $systemUnits,
            'peripherals'  => $peripherals,
            'equipments'   => $equipments,
        ]);
    }

    // Peripheral types (for filters)
    public function peripheralTypes()
    {
        $types = Peripheral::select('type')->distinct()->pluck('type');
        return response()->json($types);
    }

    // Equipment condition by room (summary)
    public function equipmentConditionByRoom()
    {
        try {
            $rooms = Room::all();

            $data = $rooms->map(function ($room) {
                $systemUnits = SystemUnit::where('room_id', $room->id)
                    ->selectRaw('`condition`, COUNT(*) as total')
                    ->groupBy('condition')
                    ->pluck('total', 'condition')
                    ->toArray();

                $peripherals = Peripheral::where('room_id', $room->id)
                    ->selectRaw('`condition`, COUNT(*) as total')
                    ->groupBy('condition')
                    ->pluck('total', 'condition')
                    ->toArray();

                $equipments = Equipment::where('room_id', $room->id)
                    ->selectRaw('`condition`, COUNT(*) as total')
                    ->groupBy('condition')
                    ->pluck('total', 'condition')
                    ->toArray();

                $merged = [];
                foreach ([$systemUnits, $peripherals, $equipments] as $dataset) {
                    foreach ($dataset as $condition => $count) {
                        $merged[$condition] = ($merged[$condition] ?? 0) + $count;
                    }
                }

                return array_merge(['room' => $room->room_number], $merged);
            });

            return response()->json($data);
        } catch (\Throwable $e) {
            \Log::error("equipmentConditionByRoom error: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Equipment types (for filters)
public function equipmentTypes()
{
    $types = Equipment::select('type')->distinct()->pluck('type');
    return response()->json($types);
}


    // Rooms list (for filters)
    public function roomsList()
    {
        $rooms = Room::select('id', 'room_number')->get();
        return response()->json($rooms);
    }
}
