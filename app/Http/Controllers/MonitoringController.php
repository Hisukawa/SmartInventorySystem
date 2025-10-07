<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\RoomStatus;
use Inertia\Inertia;

class MonitoringController extends Controller
{
    public function monitoring()
    {
        return Inertia::render('Admin/Rooms/Monitoring', [
            'user' => Auth::user(),
        ]);
    }

   public function deactivateOnLogout(Request $request)
{
    if (Auth::check()) {
        RoomStatus::where('scanned_by', Auth::id())
            ->where('is_active', true) // only update active sessions
            ->update([
                'is_active' => false,
                'logged_out_at' => now(),
            ]);
    }

    // continue logout
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/'); // or login page
}


public function facultyLogs(Request $request)
{
    // ✅ Dropdown data (faculties + rooms)
    $facultyOptions = \App\Models\User::select('id', 'name')
        ->orderBy('name')
        ->get()
        ->toArray();

    $roomOptions = \App\Models\Room::select('id', 'room_number')
        ->orderBy('room_number')
        ->get()
        ->toArray();

    // ✅ Base query: include logs (roomStatuses) + room info
    $query = \App\Models\User::with([
        'roomStatuses' => function ($q) {
            $q->with('room:id,room_number')
                ->orderBy('created_at', 'desc'); // 👈 newest logs first
        },
    ])->select('id', 'name');

    // ✅ Filters
    if ($request->filled('faculty_id')) {
        $query->where('id', $request->faculty_id);
    }

    if ($request->filled('room_id')) {
        $roomId = $request->room_id;
        $query->whereHas('roomStatuses', function ($sub) use ($roomId) {
            $sub->where('room_id', $roomId);
        });
    }

    if ($request->filled('log_date')) {
        $logDate = $request->log_date;
        $query->whereHas('roomStatuses', function ($sub) use ($logDate) {
            $sub->whereDate('created_at', $logDate);
        });
    }

    $faculties = $query->paginate(10);

    return response()->json([
        'logs' => $faculties,
        'facultyOptions' => $facultyOptions,
        'roomOptions' => $roomOptions,
    ]);
}


}
