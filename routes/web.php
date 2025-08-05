<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SystemUnitController;

// 🔐 Redirect root to login page
Route::get('/', function () {
    return redirect()->route('login');
});

// 🔓 Auth routes (login, register, password reset, etc.)
require __DIR__ . '/auth.php';

// 🔐 All protected routes go here
Route::middleware(['auth'])->group(function () {
    // ✅ Shared Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // ✅ Profile management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ✅ System Units (all users)
    Route::get('/units', [SystemUnitController::class, 'index'])->name('units.index');
    Route::post('/units', [SystemUnitController::class, 'store'])->name('units.store');

    // ✅ Admin-only routes
    Route::middleware('role:admin')->group(function () {
        // Rooms
        Route::get('/admin/rooms', [RoomController::class, 'index'])->name('rooms.index');
        Route::post('/admin/rooms', [RoomController::class, 'store'])->name('rooms.store');
        Route::get('/admin/rooms/{room}/edit', [RoomController::class, 'edit'])->name('rooms.edit');
        Route::put('/admin/rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
        Route::delete('/admin/rooms/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');

        // System Units
        Route::put('/system-units/{id}', [SystemUnitController::class, 'update']);
        Route::delete('/system-units/{id}', [SystemUnitController::class, 'destroy']);

        // Admin Dashboard
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    });

    // ✅ Faculty-only routes
    Route::middleware('role:faculty')->group(function () {
        Route::get('/faculty/dashboard', function () {
            return Inertia::render('FacultyDashboard');
        });
    })->name('faculty.dashboard');

    // ✅ Technician-only routes
    Route::middleware('role:technician')->group(function () {
        Route::get('/technician/dashboard', function () {
            return Inertia::render('TechnicianDashboard');
        });
    })->name('technician.dashboard');

    // ✅ Guest-only routes
    Route::middleware('role:guest')->group(function () {
        Route::get('/guest/dashboard', function () {
            return Inertia::render('GuestDashboard');
        });
    })->name('guest.dashboard');
});










// =======================================================================
//                           do not delete
// =======================================================================


// use App\Http\Controllers\AdminController;
// use App\Http\Controllers\ProfileController;
// use App\Http\Controllers\RoomController;
// use Illuminate\Foundation\Application;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\SystemUnitController;
// use Inertia\Inertia;

// // Public Welcome Page
// Route::get('/', function () {
//     return redirect()->route('login');
// });

// // Shared Dashboard (can customize redirection later per role if needed)
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// // Authenticated User Routes (All roles)
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// // units
// Route::middleware(['auth'])->group(function () {
//     Route::get('/units', [SystemUnitController::class, 'index'])->name('units.index');
//     Route::post('/units', [SystemUnitController::class, 'store'])->name('units.store');
// });

// // Admin Only Routes
// Route::middleware(['auth', 'role:admin'])->group(function () {
//     // Rooms
//     Route::get('/admin/rooms', [RoomController::class, 'index'])->name('rooms.index');
//     Route::post('/admin/rooms', [RoomController::class, 'store'])->name('rooms.store');
//     Route::get('/admin/rooms/{room}/edit', [RoomController::class, 'edit'])->name('rooms.edit');
//     Route::put('/admin/rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
//     Route::delete('/admin/rooms/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');

//     // System Unit
//     Route::put('/system-units/{id}', [SystemUnitController::class, 'update']);
//     Route::delete('/system-units/{id}', [SystemUnitController::class, 'destroy']);


//     // Admin Dashboard
//     Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
// });

// // Faculty Only Routes
// Route::middleware(['auth', 'role:faculty'])->group(function () {
//     Route::get('/faculty/dashboard', function () {
//         return Inertia::render('FacultyDashboard');
//     });
// })->name('faculty.dashboard');

// // Technician Only Routes
// Route::middleware(['auth', 'role:technician'])->group(function () {
//     Route::get('/technician/dashboard', function () {
//         return Inertia::render('TechnicianDashboard');
//     });
// })->name('technician.dashboard');

// // Guest Only Routes (optional)
// Route::middleware(['auth', 'role:guest'])->group(function () {
//     Route::get('/guest/dashboard', function () {
//         return Inertia::render('GuestDashboard');
//     });
// })->name('guest.dashboard');

// require __DIR__.'/auth.php';
