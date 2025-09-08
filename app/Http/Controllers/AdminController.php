<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Peripheral;
use App\Models\Room;
use App\Models\SystemUnit;
use App\Models\User;
use Illuminate\Contracts\Foundation\MaintenanceMode;
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
            // ✅ Count all equipments except system units & peripherals
            'totalEquipments'  => Equipment::count(),
            'occupiedRooms' => Room::where('is_active')->count(),
        ]);
    }

    public function roomsStatus()
    {
        $rooms = Room::all(); // no pagination yet
        return response()->json($rooms);
    }

}
