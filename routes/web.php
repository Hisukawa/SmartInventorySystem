<?php

use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\Faculty\FacultyController;
use App\Http\Controllers\Faculty\FacultyRoomController;
use App\Http\Controllers\PeripheralController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SystemUnitController;
use App\Http\Controllers\Auth\WebAuthnController;

use App\Http\Controllers\Reports;
use App\Models\Equipment;
use App\Models\Room;
use App\Models\User;
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

Route::post('/webauthn/login/options', [WebAuthnController::class, 'loginOptions']);
Route::post('/webauthn/login', [WebAuthnController::class, 'login']);
Route::post('/webauthn/register/options', [WebAuthnController::class, 'registerOptions']);
Route::post('/webauthn/register', [WebAuthnController::class, 'register']);


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

        Route::get('/admin/dashboard-stats', [AdminController::class, 'dashboardStats']);
        Route::get('/admin/rooms-status', [AdminController::class, 'roomsStatus']);


        // Admin Dashboard
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

        // Room Monitoring
        Route::get('/admin/monitoring', [MonitoringController::class, 'monitoring'])->name('admin.monitoring');


        // Rooms
        Route::get('/admin/rooms', [RoomController::class, 'index'])->name('rooms.index');
        Route::get('/admin/rooms/create', [RoomController::class, 'create'])->name('rooms.create'); // <- new page
        Route::post('/admin/rooms', [RoomController::class, 'store'])->name('rooms.store');
        Route::get('/admin/rooms/{room}/edit', [RoomController::class, 'edit'])->name('rooms.edit');
        Route::put('/admin/rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
        Route::delete('/admin/rooms/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');


        // System Units
        Route::get('/system-units', [SystemUnitController::class, 'index']) ->name('system-units.index');

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
        Route::get('/admin/peripherals/{id}', [PeripheralController::class, 'show'])->name('peripherals.show');


        // Room Equipments
        Route::get('/equipments', [EquipmentController::class, 'index'])->name('equipments.index'); // List all
        Route::get('/equipments/addequipment', [EquipmentController::class, 'create'])->name('equipments.create'); // Create form
        Route::post('/equipments', [EquipmentController::class, 'store'])->name('equipments.store'); // Store
        Route::get('/equipments/view/{equipment_code}', [EquipmentController::class, 'show'])->name('equipments.show'); // View single
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


        // Viewing Faculty Reports
        Route::get('/faculty/reports', [Reports:: class, 'index'])->name('admin.reports.index');

        // status for force logout
        Route::put('/api/admin/rooms/{room}/status', [RoomController::class, 'updateStatus']);



        Route::get('/admin/reports/{report}', [ReportController::class, 'show'])
        ->name('admin.reports.show');

        Route::get('/admin/notifications', [NotificationController::class, 'index'])->name('admin.notifications.index');
        Route::post('/admin/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('admin.notifications.read');
        Route::post('/admin/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('admin.notifications.readAll');
    });


    // Shared QR scan route (works for any logged-in role)
    Route::get('/room/{slug}', [RoomController::class, 'show'])
        ->where('slug', '.*')
        ->name('room.show');


    // Faculty-only routes
    Route::middleware(['auth', 'role:faculty'])->group(function () {
        // Faculty dashboard
        Route::get('/faculty/dashboard', [FacultyController::class, 'dashboard'])
            ->name('faculty.dashboard');

        Route::get('/faculty-room-dashboard', [FacultyController::class, 'showRoom'])->name('faculty.rooms.dashboard');
        // Faculty room view (QR scan)
        Route::get('/room/{roomPath}', [RoomController::class, 'show'])
            ->where('roomPath', '.*')
            ->name('room.show');

        Route::get('/rooms/{room}/units/{unit}', [FacultyRoomController::class, 'showUnit'])
        ->name('faculty.units.show');


        //Showing Peripherals if the faculty Click The View Action
        Route::get('/rooms/{room}/peripherals/{peripheral}', [PeripheralController::class, 'showPeripherals'])->name('faculty.peripherals.show');


        Route::get('/rooms/{room}/equipments/{equipment}', [EquipmentController::class, 'showRoomEquipments'])
            ->name('faculty.equipments.show');



        //API endpoint to fetch which room is active and which faculty are there

        Route::middleware('auth')->get('/faculty/rooms-status', [FacultyController::class, 'roomsStatus']);

        Route::resource('reports', Reports::class);



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


//Route to see all users the units details without logging in
Route::get('/unit/{unit_path}', [SystemUnitController::class, 'showUnitsDetails'])
    ->where('unit_path', '.*')
    ->name('units.public.show');

//Route to see all users peripherals details without logging in
Route::get('/peripherals/{peripheral_code}', [PeripheralController::class, 'showPeripheralsDetails'])
    ->name('peripherals.public.show');

//Route to see all users equipment details without logging in
Route::get('/equipment/{equipment_code}', [EquipmentController::class, 'showEquipmentsDetails'])
    ->name('equipment.public.show');








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
