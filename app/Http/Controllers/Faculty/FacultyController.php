<?php

namespace App\Http\Controllers\Faculty;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FacultyController extends \App\Http\Controllers\Controller
{
    public function dashboard()
    {
        return Inertia::render('Faculty/FacultyDashboard', [
            'user' => Auth::user(),
        ]);
    }
}
