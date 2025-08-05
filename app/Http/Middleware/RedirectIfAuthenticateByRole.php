<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticatedByRole
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $role = Auth::user()->role;

            return match ($role) {
                'admin' => redirect('/admin/dashboard'),
                'faculty' => redirect('/faculty/dashboard'),
                'technician' => redirect('/technician/dashboard'),
                'guest' => redirect('/guest/dashboard'),
                default => redirect('/'),
            };
        }

        return $next($request);
    }
}
