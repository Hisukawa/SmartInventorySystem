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
    // Dropdown data
    $facultyOptions = \App\Models\User::select('id', 'name', 'role')
        ->orderBy('name')
        ->get();

    $roomOptions = \App\Models\Room::select('id', 'room_number')
        ->orderBy('room_number')
        ->get();

    // Base query: RoomStatus with user and room
    $query = \App\Models\RoomStatus::with([
        'faculty:id,name,role', // ✅ use the correct relationship name
        'room:id,room_number'
    ]);

    // Filters
    if ($request->filled('faculty_id')) {
        $query->where('scanned_by', $request->faculty_id);
    }

    if ($request->filled('room_id')) {
        $query->where('room_id', $request->room_id);
    }

    if ($request->filled('log_date')) {
        $query->whereDate('created_at', $request->log_date);
    }

    // Optional search by faculty name
    if ($request->filled('search')) {
        $search = $request->search;
        $query->whereHas('faculty', function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%");
        });
    }

    try {
        $logs = $query->orderBy('created_at', 'desc')->paginate(10);
    } catch (\Exception $e) {
        \Log::error('Failed to fetch logs: ' . $e->getMessage());
        return response()->json(['message' => 'Failed to fetch logs'], 500);
    }

    return response()->json([
        'logs' => $logs,
        'facultyOptions' => $facultyOptions,
        'roomOptions' => $roomOptions,
    ]);
}




}
