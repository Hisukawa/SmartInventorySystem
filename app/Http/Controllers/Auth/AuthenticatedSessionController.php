<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Room;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = $request->user();

        // Redirect based on role with intended fallback
        switch ($user->role) {
            case 'admin':
                return redirect()->intended(route('admin.dashboard'));

            case 'faculty':
                return redirect()->intended(route('profile.edit'));

            case 'technician':
                return redirect()->intended(route('profile.edit'));

            case 'guest':
                return redirect()->intended(route('profile.edit'));

            default:
                return redirect()->route('profile.edit'); // fallback
        }
    }



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // If the user has an active room, set it inactive
        if ($request->user() && $request->user()->active_room_id) {
            Room::where('id', $request->user()->active_room_id)
                ->update(['is_active' => 0]);
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
