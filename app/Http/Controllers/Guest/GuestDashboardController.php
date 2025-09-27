<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomStatus;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GuestDashboardController extends Controller
{
    public function index()
    {
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
}
