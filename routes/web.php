<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Welcome Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Shared Dashboard (can customize redirection later per role if needed)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Authenticated User Routes (All roles)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Only Routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/rooms', [RoomController::class, 'index']);
    Route::post('/admin/rooms', [RoomController::class, 'store']);
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
});

// Faculty Only Routes
Route::middleware(['auth', 'role:faculty'])->group(function () {
    Route::get('/faculty/dashboard', function () {
        return Inertia::render('FacultyDashboard');
    });
})->name('faculty.dashboard');

// Technician Only Routes
Route::middleware(['auth', 'role:technician'])->group(function () {
    Route::get('/technician/dashboard', function () {
        return Inertia::render('TechnicianDashboard');
    });
})->name('technician.dashboard');

// Guest Only Routes (optional)
Route::middleware(['auth', 'role:guest'])->group(function () {
    Route::get('/guest/dashboard', function () {
        return Inertia::render('GuestDashboard');
    });
})->name('guest.dashboard');

require __DIR__.'/auth.php';
