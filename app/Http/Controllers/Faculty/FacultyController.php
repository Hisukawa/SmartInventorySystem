<?php

namespace App\Http\Controllers\Faculty;
use App\Models\RoomStatus;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Room;
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
        $systemUnitsTotal = \DB::table('users')::table('system_units')->count();
        $peripheralsTotal = \DB::table('peripherals')->count();
        $equipmentsTotal  = \DB::table('equipments')->count();

        $totalItems = $systemUnitsTotal + $peripheralsTotal + $equipmentsTotal;

        // === Dynamic Equipment Conditions ===
        $conditions = \DB::table('system_units')->select('condition')->distinct()
            ->union(\DB::table('peripherals')->select('condition')->distinct())
            ->union(\DB::table('equipments')->select('condition')->distinct())
            ->pluck('condition')
            ->filter()
            ->unique()
            ->values(); // reset array keys

        $conditionCounts = $conditions->map(function ($condition) {
            return [
                'name'  => $condition,
                'value' =>
                    \DB::table('system_units')->where('condition', $condition)->count()
                + \DB::table('peripherals')->where('condition', $condition)->count()
                + \DB::table('equipments')->where('condition', $condition)->count(),
            ];
        });

        return Inertia::render('Faculty/FacultyDashboard', [
            'user'        => $user,
            'activeRooms' => $activeRooms,
            'summary'     => [
                'totalRooms'       => $totalRooms,
                'availableRooms'   => $availableRooms,
                'occupiedRooms'    => $occupiedRooms,
                'totalItems'       => $totalItems,
                'systemUnitsTotal' => $systemUnitsTotal,
                'peripheralsTotal' => $peripheralsTotal,
                'equipmentsTotal'  => $equipmentsTotal,
                'conditions'       => $conditionCounts, // ✅ dynamic values
            ],
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


}
