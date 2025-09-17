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
                ->update(['is_active' => '0']);
        }

        // continue logout
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/'); // or login page
    }
}
