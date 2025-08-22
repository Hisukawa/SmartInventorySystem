<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\Faculty\FacultyController;
use App\Http\Controllers\Faculty\FacultyRoomController;
use App\Http\Controllers\PeripheralController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SystemUnitController;
use Illuminate\Support\Facades\Auth;


// ✅ Public routes (only login/register/etc.)
Route::get('/', function () {
    return redirect()->route('login');
});

// Login page
Route::get('/login', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('login');


// Auth routes (Laravel Breeze/Fortify/etc.)
require __DIR__ . '/auth.php';


// All protected routes go here
Route::middleware(['auth'])->group(function () {
    // API endpoint to fetch rooms with status for Admin Dashboard
    Route::get('/api/admin/rooms-status', [RoomController::class, 'getRoomStatus']);

    // Shared Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');


    // Profile management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // System Units (all users)
    Route::get('/units', [SystemUnitController::class, 'index'])->name('units.index');
    Route::post('/units', [SystemUnitController::class, 'store'])->name('units.store');
    //Route::get('/room/{roomPath}', [RoomController::class, 'show'])->where('roomPath', '.*') // <-- this allows slashes in parameter
                                                                    //->name('room.show');

    // Admin-only routes
    Route::middleware('role:admin')->group(function () {

        // Admin Dashboard
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');


        // Rooms
        Route::get('/admin/rooms', [RoomController::class, 'index'])->name('rooms.index');
        Route::get('/admin/rooms/create', [RoomController::class, 'create'])->name('rooms.create'); // <- new page
        Route::post('/admin/rooms', [RoomController::class, 'store'])->name('rooms.store');
        Route::get('/admin/rooms/{room}/edit', [RoomController::class, 'edit'])->name('rooms.edit');
        Route::put('/admin/rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
        Route::delete('/admin/rooms/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');


        // System Units
        Route::put('/system-units/{id}', [SystemUnitController::class, 'update']);
        Route::delete('/system-units/{id}', [SystemUnitController::class, 'destroy']);
        Route::get('/system-units/view/{unit_code}', [SystemUnitController::class, 'show'])->name('system-units.view');


        // Peripherals
        Route::get('/admin/peripherals', [PeripheralController::class, 'index'])->name('peripherals.index');
        Route::get('/admin/peripherals/create', [PeripheralController::class, 'create'])->name('peripherals.create');
        Route::post('/admin/peripherals', [PeripheralController::class, 'store'])->name('peripherals.store');
        Route::get('/admin/peripherals/{peripheral}/edit', [PeripheralController::class, 'edit'])->name('peripherals.edit');
        Route::put('/admin/peripherals/{peripheral}', [PeripheralController::class, 'update'])->name('peripherals.update');
        Route::delete('/admin/peripherals/{peripheral}', [PeripheralController::class, 'destroy'])->name('peripherals.destroy');
        Route::get('/admin/peripherals/{peripheral}', [PeripheralController::class, 'show'])->name('peripherals.show');


        // Room Equipments
        Route::get('/equipments', [EquipmentController::class, 'index'])->name('equipments.index'); // List all
        Route::get('/equipments/addequipment', [EquipmentController::class, 'create'])->name('equipments.create'); // Create form
        Route::post('/equipments', [EquipmentController::class, 'store'])->name('equipments.store'); // Store
        Route::get('/equipments/{equipment}', [EquipmentController::class, 'show'])->name('equipments.show'); // View single
        Route::get('/equipments/{equipment}/edit', [EquipmentController::class, 'edit'])->name('equipments.edit'); // Edit form
        Route::put('/equipments/{equipment}', [EquipmentController::class, 'update'])->name('equipments.update'); // Update
        Route::delete('/equipments/{equipment}', [EquipmentController::class, 'destroy'])->name('equipments.destroy'); // Delete


        // User Management
        Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users.index');
        Route::get('/admin/users/{user}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
        Route::post('/admin/users', [UserController::class, 'store'])->name('admin.users.store');
        Route::put('/admin/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
        Route::delete('/admin/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
        Route::get('/admin/users/{user}', [UserController::class, 'show'])->name('admin.users.show');


        // User Registration
        Route::get('/register', [RegisteredUserController::class, 'create'])
            ->name('register');
        Route::post('/register', [RegisteredUserController::class, 'store']);

    });



    // Faculty-only routes
    Route::middleware(['auth', 'role:faculty'])->group(function () {
        // Faculty dashboard
        Route::get('/faculty/dashboard', [FacultyController::class, 'dashboard'])
            ->name('faculty.dashboard');

        // Faculty room view (QR scan)
        Route::get('/room/{roomPath}', [RoomController::class, 'show'])
            ->where('roomPath', '.*')
            ->name('room.show');

        Route::get('/rooms/{room}/units/{unit}', [FacultyRoomController::class, 'showUnit'])
        ->name('faculty.units.show');
    });




    // Technician-only routes
    Route::middleware('role:technician')->group(function () {
        Route::get('/technician/dashboard', function () {
            return Inertia::render('TechnicianDashboard');
        });
    })->name('technician.dashboard');

    // Guest-only routes
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
