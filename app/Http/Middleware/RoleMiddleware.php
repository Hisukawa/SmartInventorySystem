<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
      if (!Auth::check()) {
    return redirect()->route('login')->with('error', 'Please login to continue.');
}

$role = Auth::user()->role;

// Debug: show current role vs allowed roles
// You can log it instead of dd()
if (!in_array($role, $roles)) {
    abort(403, "Unauthorized. Your role is [$role], allowed: " . implode(',', $roles));
}

return $next($request);
    }
}
