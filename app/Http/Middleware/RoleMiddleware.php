<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to continue.');
        }

        $role = Auth::user()->role;

        // Debug: log current route, role, and allowed roles
        Log::info('RoleMiddleware check', [
            'route_name' => optional($request->route())->getName(),
            'route_uri' => $request->path(),
            'user_role' => $role,
            'allowed_roles' => $roles,
        ]);

        if (!in_array($role, $roles)) {
            abort(403, "Unauthorized. Your role is [$role], allowed: " . implode(',', $roles));
        }

        return $next($request);
    }
}
