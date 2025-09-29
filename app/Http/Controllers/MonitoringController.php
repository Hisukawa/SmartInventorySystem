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

    // 🔍 Search by faculty or room number (general search)
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

    // 🎓 Filter by Faculty Name
    if ($request->filled('faculty_id')) { // change param name later if needed
        $facultyName = $request->faculty_id;
        $query->whereHas('scannedBy', function ($sub) use ($facultyName) {
            $sub->where('name', 'like', "%{$facultyName}%");
        });
    }

    // 🏫 Filter by Room Number
    if ($request->filled('room_id')) {
        $roomNumber = $request->room_id;
        $query->whereHas('room', function ($sub) use ($roomNumber) {
            $sub->where('room_number', 'like', "%{$roomNumber}%");
        });
    }

    // 📅 Date From
    if ($request->filled('date_from')) {
        $query->whereDate('created_at', '>=', $request->date_from);
    }

    // 📅 Date To
    if ($request->filled('date_to')) {
        $query->whereDate('created_at', '<=', $request->date_to);
    }

    $logs = $query->paginate(10);

    return response()->json($logs);
}

}
