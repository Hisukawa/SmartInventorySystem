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
