<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Peripheral;
use App\Models\Report;
use App\Models\Room;
use App\Models\SystemUnit;
use App\Models\User;
use App\Models\RoomStatus;
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

    public function dashboardStats()
    {
        return response()->json([
            'totalRooms'       => Room::count(),
            'totalSystemUnits' => SystemUnit::count(),
            'totalPeripherals' => Peripheral::count(),
            'totalEquipments'  => Equipment::count(),

            // ✅ now using latestStatus instead of rooms.is_active
            'occupiedRooms'    => Room::whereHas('latestStatus', function ($q) {
                $q->where('is_active', true);
            })->count(),

            'pendingRequests'  => Report::where('condition', '!=', 'Resolved')->count(),
            'forRepair'        => Report::whereIn('condition', ['For Repair', 'Defective'])->count(),
        ]);
    }

    public function activityLogs()
    {
        $logs = Report::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($report) {
                return [
                    'user'      => $report->user?->name ?? 'Unknown',
                    'action'    => $report->condition . ' - ' . ($report->remarks ?? 'No remarks'),
                    'timestamp' => $report->created_at->format('Y-m-d H:i'),
                ];
            });

        return response()->json($logs);
    }

    public function maintenanceRequests()
    {
        $requests = Report::where('condition', '!=', 'Resolved')
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($report) {
                return [
                    'equipment'   => 'EQP-' . $report->reportable_id,
                    'issue'       => $report->condition,
                    'reported_by' => $report->user?->name ?? 'Unknown',
                ];
            });

        return response()->json($requests);
    }

    public function reportStats()
    {
        // Example: weekly summary grouped by day
        $data = [
            ['day' => 'Mon', 'equipments' => 5, 'issues' => 2],
            ['day' => 'Tue', 'equipments' => 3, 'issues' => 1],
            ['day' => 'Wed', 'equipments' => 8, 'issues' => 4],
            ['day' => 'Thu', 'equipments' => 2, 'issues' => 0],
            ['day' => 'Fri', 'equipments' => 6, 'issues' => 3],
            ['day' => 'Sat', 'equipments' => 6, 'issues' => 3],
            ['day' => 'Sun', 'equipments' => 6, 'issues' => 3],
        ];

        return response()->json($data);
    }

    public function roomsStatus()
    {
        // ✅ include latest status & user
        $rooms = Room::with(['latestStatus.user'])
            ->get()
            ->map(fn ($room) => [
                'id'              => $room->id,
                'room_number'     => $room->room_number,
                'room_path'       => $room->room_path,
                'is_active'       => (bool) ($room->latestStatus?->is_active ?? 0),
                'last_scanned_by' => $room->latestStatus?->user?->name,
                'last_scanned_at' => $room->latestStatus?->created_at,
            ]);

        return response()->json($rooms);
    }
}
