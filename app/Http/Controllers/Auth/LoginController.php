<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // ✅ Validate request input
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            // ✅ Redirect to the correct dashboard route name
            switch ($user->role) {
                case 'admin':
                    return redirect()->route('admin.dashboard');
                case 'faculty':
                    return redirect()->route('faculty.dashboard');
                case 'technician':
                    return redirect()->route('technician.dashboard');
                case 'guest':
                    return redirect()->route('guest.dashboard');
                default:
                    return redirect()->route('default.dashboard'); // fallback route
            }
        }

        // ❌ Invalid login
        return back()->withErrors([
            'email' => 'Invalid email or password.',
        ]);
    }
}
