<?php

namespace App\Http\Controllers\Faculty;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Room;
class FacultyController extends \App\Http\Controllers\Controller
{
public function dashboard()
{
    $user = Auth::user();

    // Last 3 rooms visited by this faculty
    $recentRooms = \DB::table('room_statuses')
        ->join('rooms', 'rooms.id', '=', 'room_statuses.room_id')
        ->where('room_statuses.scanned_by', $user->id)
        ->orderByDesc('room_statuses.created_at')
        ->limit(5)
        ->select('rooms.room_number', 'room_statuses.is_active', 'room_statuses.created_at')
        ->get();

    // Reports submitted by the faculty, including room number and item type
    $reports = \DB::table('reports')
        ->join('rooms', 'rooms.id', '=', 'reports.room_id')
        ->where('reports.user_id', $user->id)
        ->orderByDesc('reports.created_at')
        ->select(
            'reports.id',
            'reports.reportable_type',
            'reports.reportable_id',
            'reports.condition',
            'reports.remarks',
            'reports.created_at',
            'rooms.room_number'
        )
        ->get()
        ->map(function ($report) {
            // Convert reportable_type to a more readable format
            $report->item = match($report->reportable_type) {
                'peripheral' => 'Peripheral',
                'equipment' => 'Equipment',
                'system_unit' => 'System Unit',
                default => $report->reportable_type,
            };
            return $report;
        });

    // Latest notifications / announcements (last 5)
    $announcements = \DB::table('notifications')
        ->orderByDesc('created_at')
        ->limit(5)
        ->get();

    return Inertia::render('Faculty/FacultyDashboard', [
        'user' => $user,
        'recentRooms' => $recentRooms,
        'reports' => $reports,
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
                $room->is_active = true;
                $room->scanned_at = $latestStatus->created_at;
                $room->setRelation('faculties', collect([$latestStatus->faculty]));
            } else {
                $room->is_active = false;
                $room->scanned_at = $latestStatus ? $latestStatus->created_at : null;
                $room->setRelation('faculties', collect([]));
            }

            return $room;
        })
        ->values(); // ✅ ensures array, not collection with gaps

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
