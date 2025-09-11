<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Peripheral;
use App\Models\Report;
use App\Models\Room;
use App\Models\SystemUnit;
use App\Models\User;
use Illuminate\Contracts\Foundation\MaintenanceMode;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

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
            'occupiedRooms'    => Room::where('is_active', true)->count(),
            'pendingRequests'  => Report::where('condition', '!=', 'Resolved')->count(),
            'forRepair' => Report::whereIn('condition', ['For Repair', 'Defective'])->count(),
            // 'availablePeripherals' => Peripheral::where('status', 'Available')->count(),
            // 'activeUsers'      => User::where('is_active', true)->count(), //ADD COLUMN FOR THE STATUS OF THE USER
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
                    'user'      => $report->user ? $report->user->name : 'Unknown',
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
                    'reported_by' => $report->user ? $report->user->name : 'Unknown',
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
        $rooms = Room::all(); // no pagination yet
        return response()->json($rooms);
    }

    //============================================================================================
    // for checking IP address in the console delete if youre displaying it in the ui
    // public function showIp()
    // {
    //     $ip = request()->ip();
    //     $userAgent = request()->userAgent();

    //     // Use imported Log facade
    //     Log::info("User IP: " . $ip);
    //     Log::info("User Agent: " . $userAgent);

    //     return response()->json([
    //         'ip' => $ip,
    //         'user_agent' => $userAgent,
    //     ]);
    // }
    //============================================================================================



}
