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
    $query = RoomStatus::with(['scannedBy:id,name', 'room:id,room_number'])
        ->orderBy('created_at', 'desc');

    // 🔍 Search by faculty or room number
    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
            $q->whereHas('scannedBy', function ($sub) use ($search) {
                $sub->where('name', 'like', "%{$search}%");
            })->orWhereHas('room', function ($sub) use ($search) {
                $sub->where('room_number', 'like', "%{$search}%");
            });
        });
    }

    // 🎯 Filter by faculty
    if ($request->filled('faculty_id')) {
        $query->where('scanned_by', $request->faculty_id);
    }

    // 🎯 Filter by room
    if ($request->filled('room_id')) {
        $query->where('room_id', $request->room_id);
    }

    // 📅 Filter by date range
    if ($request->filled('date_from') && $request->filled('date_to')) {
        $query->whereBetween('created_at', [
            $request->date_from . ' 00:00:00',
            $request->date_to . ' 23:59:59',
        ]);
    }

    $logs = $query->paginate(10);

    return response()->json($logs);
}

}
