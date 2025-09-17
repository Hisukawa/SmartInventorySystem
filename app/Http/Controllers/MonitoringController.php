<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\RoomStatus;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
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

    // For generating the QR that links to our new route
    public function showLogoutQr()
    {
        $qrCode = QrCode::size(200)->generate(route('qr.logout.qr'));

        return inertia('Admin/LogoutQr', [
            'qrCode' => $qrCode
        ]);
    }

    // The actual QR logout route
    public function qrLogout(Request $request)
    {
        return $this->deactivateOnLogout($request);
    }
}
