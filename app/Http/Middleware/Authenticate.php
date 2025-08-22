<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            // Prevent infinite loop if already on login or register
            if ($request->is('login') || $request->is('register')) {
                return $next($request);
            }

            // Store intended URL (e.g. /room/101) before sending to login
            return redirect()->guest(route('login'));
        }

        return $next($request);
    }
}
