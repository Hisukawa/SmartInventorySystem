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

            // Room Occupancy
            // Ensure you have a 'latestStatus' relationship defined in your Room model
            'occupiedRooms'    => Room::whereHas('latestStatus', fn($q) => $q->where('is_active', true))->count(),

            // Reports
            'pendingRequests'  => Report::where('condition', '!=', 'Resolved')->count(),
            'forRepair'        => Report::whereIn('condition', ['For Repair', 'Defective'])->count(),

            // Extra stats
            'availablePeripherals' => Peripheral::where('condition', 'Good')->count(),
            'activeUsers'          => User::whereNotNull('email_verified_at')->count(),
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
                'equipment'   => 'EQP-' . $report->reportable_id, // Assuming reportable_id exists
                'issue'       => $report->condition,
                'reported_by' => $report->user?->name ?? 'Unknown',
            ]);

        return response()->json($requests);
    }

    // 🏫 Room occupancy widget
 public function roomsStatus()
{
    $rooms = Room::with(['latestStatus.user'])->get();

    $occupiedCount = 0;
    $availableCount = 0;
    $details = [];

    foreach ($rooms as $room) {
        $isActive = (bool) ($room->latestStatus->is_active ?? false);

        if ($isActive) {
            $occupiedCount++;
        } else {
            $availableCount++;
        }

        $details[] = [
            'id'              => $room->id,
            'room_number'     => $room->room_number,
            'is_active'       => $isActive,
            'last_scanned_by' => $room->latestStatus?->user?->name,
            'last_scanned_at' => $room->latestStatus?->created_at,
        ];
    }

    return response()->json([
        'occupied'  => $occupiedCount,
        'available' => $availableCount,
        'details'   => $details,
    ]);
}

    // 🖥 Equipment condition breakdown by type
    public function equipmentCondition()
    {
        $systemUnits = SystemUnit::select('condition')->get()
            ->groupBy('condition')
            ->map->count()
            ->toArray();

        $peripherals = Peripheral::select('condition')->get()
            ->groupBy('condition')
            ->map->count()
            ->toArray();

        $equipments = Equipment::select('condition')->get()
            ->groupBy('condition')
            ->map->count()
            ->toArray();

        return response()->json([
            'system_units' => $systemUnits,
            'peripherals'  => $peripherals,
            'equipments'   => $equipments,
        ]);
    }
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


}