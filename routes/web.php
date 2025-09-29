<?php

use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FaceLoginController;

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
use App\Http\Controllers\Guest\GuestDashboardController;
use App\Http\Controllers\Technician\TechnicianController;
use App\Http\Controllers\Reports;
use App\Http\Controllers\RoomHistoryController;
use App\Http\Controllers\SystemUnitHistoryController;
use App\Http\Controllers\UserHistoryController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\EquipmentHistoryController;
use App\Http\Controllers\FaceController;
use App\Http\Controllers\PeripheralHistoryController;
use App\Models\Equipment;
use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\Auth;



// ✅ Public routes (only login/register/etc.)
Route::get('/', function () {
    return redirect()->route('login');
});

//Route to see all users the units details without logging in
Route::get('/unit/{unit_path}', [SystemUnitController::class, 'showUnitsDetails'])
    ->where('unit_path', '.*')
    ->name('units.public.show');

//Route to see all users peripherals details without logging in
Route::get('/peripherals/{peripheral_code}', [PeripheralController::class, 'showPeripheralsDetails'])
    ->name('peripherals.public.show');

Route::get('/rooms/{room}/equipments/{equipmentId}', [RoomController::class, 'showRoomEquipments'])
    ->name('rooms.public.equipments.show');


//Route to see all users equipment details without logging in

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


    //Route::get('/room/{roomPath}', [RoomController::class, 'show'])->where('roomPath', '.*') // <-- this allows slashes in parameter
                                                                    //->name('room.show');

    // for checking IP address in the console
    Route::get('/test-ip', [AdminController::class, 'showIp']);


    Route::post('/logout', [MonitoringController::class, 'deactivateOnLogout'])
    ->name('logout');


    // Shared QR scan route (all authenticated users)

    //Wag motong i uncomment mag eerror yung guest
    Route::get('/room/{roomPath}', [RoomController::class, 'show'])
       ->where('roomPath', '.*')
      ->name('room.show');

// =======================================================================
//                           ADMIN
// =======================================================================
    // Admin-only routes
    Route::middleware('role:admin')->group(function () {

// routes/api.php
        Route::get('/admin/faculty-logs', [MonitoringController::class, 'facultyLogs'])->name('admin.logHistory.logs');

        Route::get('/admin/dashboard-stats', [AdminController::class, 'dashboardStats']);
        Route::get('/admin/activity-logs', [AdminController::class, 'activityLogs']);
        Route::get('/admin/maintenance-requests', [AdminController::class, 'maintenanceRequests']);

        Route::get('/admin/rooms-status', [AdminController::class, 'roomsStatus']);
        Route::get('/admin/equipment-condition', [AdminController::class, 'equipmentCondition']);
        Route::get('/admin/equipment-condition-by-room', [AdminController::class, 'equipmentConditionByRoom']);

        // ✅ New routes for filtering
        Route::get('/admin/equipment-condition-filtered', [AdminController::class, 'equipmentConditionFiltered']);
        Route::get('/admin/peripheral-types', [AdminController::class, 'peripheralTypes']);
        Route::get('/admin/rooms-list', [AdminController::class, 'roomsList']);

        Route::get('/admin/equipment-types', [AdminController::class, 'equipmentTypes']);
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
        // Route::get('/admin/units', [SystemUnitController::class, 'index'])->name('units.index'); // Duplicate
        Route::post('/admin/system-units', [SystemUnitController::class, 'store'])->name('system-units.store');
        Route::get('/admin/system-units', [SystemUnitController::class, 'index']) ->name('system-units.index');
        Route::put('/system-units/{id}', [SystemUnitController::class, 'update']);
        Route::delete('/system-units/{id}', [SystemUnitController::class, 'destroy']);
        Route::get('/system-units/view/{unit_code}', [SystemUnitController::class, 'show'])->name('system-units.view');


        // Peripherals
        Route::get('/admin/peripherals', [PeripheralController::class, 'index'])->name('peripherals.index');
        Route::get('/admin/peripherals/create', [PeripheralController::class, 'create'])->name('admin.peripherals.create');
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
        Route::get('admin/faculty/reports', [Reports:: class, 'index'])->name('admin.reports.index');

        // status for force logout
        Route::put('/api/admin/rooms/{room}/status', [RoomController::class, 'updateStatus']);



        // Route::get('/admin/reports/{report}', [ReportController::class, 'show'])
        //     ->name('admin.reports.show');

        Route::get('/admin/notifications', [NotificationController::class, 'index'])->name('admin.notifications.index');
        // Route::post('/admin/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('admin.notifications.read');
        // Route::post('/admin/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('admin.notifications.readAll');

        // Notification
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::patch('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);


        // History

        // Room History
        Route::get('/admin/room-histories', [RoomHistoryController::class, 'index'])
            ->name('room.histories');
        Route::delete('/room-history/{id}', [RoomHistoryController::class, 'destroy'])
            ->name('room-history.destroy');


        // System Unit History
        Route::get('/admin/system-unit-histories', [SystemUnitHistoryController::class, 'index'])
            ->name('system-unit.histories');
        Route::delete('/system-unit-history/{id}', [SystemUnitHistoryController::class, 'destroy'])
            ->name('system-unit-history.destroy');

        // User History
        Route::get('/admin/user-histories', [UserHistoryController::class, 'index']);

        // Peripheral History
        Route::get('/admin/peripherals-history', [PeripheralHistoryController::class, 'index'])->name('peripherals.history');
        Route::delete('/peripherals-history/{id}', [PeripheralHistoryController::class, 'destroy'])->name('peripherals-history.destroy');

        // Equipment History
        Route::get('/admin/equipment-history', [EquipmentHistoryController::class, 'index'])->name('equipment.history.index');
        Route::delete('/equipment-history/{id}', [EquipmentHistoryController::class, 'destroy'])->name('equipment.history.destroy');



        //Admin Announcement
        Route::get('/admin/announcement', [AnnouncementController::class, 'index'])
                ->name('admin.announcement');

        Route::post('/admin/announcement', [AnnouncementController::class, 'store'])->name('admin.announcement.store');
        Route::get('/admin/announcements/{announcement}/edit', [AnnouncementController::class, 'edit'])->name('announcement.edit');
        Route::put('/admin/announcements/{announcement}', [AnnouncementController::class, 'update'])->name('announcement.update');
        Route::delete('/admin/announcements/{announcement}', [AnnouncementController::class, 'destroy'])->name('announcement.destroy');
        });


    // Shared QR scan route (works for any logged-in role)
    //Route::get('/room/{slug}', [RoomController::class, 'show'])
        //->where('slug', '.*')
      // ->name('room.show');


// =======================================================================
//                           FACULTY
// =======================================================================

    // Faculty-only routes
    Route::prefix('faculty')->middleware(['auth', 'role:faculty'])->group(function () {

        Route::get('/units', [SystemUnitController::class, 'index'])->name('units.index');
        Route::post('/units', [SystemUnitController::class, 'store'])->name('units.store');

        // Faculty dashboard
        Route::get('/dashboard', [FacultyController::class, 'dashboard'])
            ->name('faculty.dashboard');

        Route::get('/faculty-room-dashboard', [FacultyController::class, 'showRoom'])->name('faculty.rooms.dashboard');

        // Faculty room view (QR scan)
        Route::get('/faculty/{roomPath}', [FacultyController::class, 'ShowScannedRoom'])
            ->where('roomPath', '.*')
            ->name('faculty.room.show');

            //Dashboard of scanned room
        Route::get('{roomPath}/dashboard', [FacultyController::class, 'ShowFacultyDashboard'])
        ->where('roomPath', '.*') // allow slashes
        ->name('faculty.ScannedRoom.dashboard');

        Route::get('/{roomId}/units/{unitId}', [FacultyRoomController::class, 'showUnit'])
            ->name('faculty.units.show');


        //Showing Peripherals if the faculty Click The View Action
        Route::get('/{room}/peripherals/{peripheral}', [PeripheralController::class, 'showPeripherals'])->name('faculty.peripherals.show');


        Route::get('/{room}/equipments/{equipment}', [EquipmentController::class, 'showRoomEquipments'])
        ->scopeBindings()
        ->name('faculty.equipments.show');



        //API endpoint to fetch which room is active and which faculty are there

        Route::middleware('auth')->get('/faculty/rooms-status', [FacultyController::class, 'roomsStatus']);

        Route::resource('reports', Reports::class);






    });

// =======================================================================
//                           TECHNICIAN
// =======================================================================
Route::middleware(['auth', 'role:technician'])->group(function () {

    // Dashboard

  Route::get('/technician/dashboard', [TechnicianController::class, 'dashboard'])->name('technician.dashboard');

    // Technician scanned room dashboard
    Route::get('/technician/{roomPath}/technician/dashboard', [TechnicianController::class, 'ShowTechnicianDashboard'])
        ->where('roomPath', '.*')
        ->name('technician.ScannedRoom.dashboard');

    // Show scanned room
    Route::get('/technician/{roomPath}/technician', [TechnicianController::class, 'ShowScannedRoom'])
        ->where('roomPath', '.*')
        ->name('technician.room.show');

    Route::get('/technician/{room}/units/{unit}', [TechnicianController::class, 'TechnicianshowUnit'])
            ->scopeBindings()
            ->name('technician.units.show');

        Route::get('/technician/{room}/peripherals/{peripheral}', [TechnicianController::class, 'showPeripherals'])
            ->scopeBindings() // 🔹 Important
            ->name('technician.peripherals.show');
    Route::get('technician/{room}/equipments/{equipment}', [TechnicianController::class, 'TechnicianshowRoomEquipments'])
        ->scopeBindings() // allows Equipment to be scoped under Room
        ->name('technician.equipments.show');


           Route::get('/technician/units/{unit}/edit', [TechnicianController::class, 'TechnicianEditUnit'])->name('technician.units.edit');


        //Adding Assets
        Route::put('/technician/units/{unit}', [TechnicianController::class, 'TechnicianUpdateUnits'])
            ->name('technician.units.update');
        Route::get('/technician/units/{unit}/edit', [TechnicianController::class, 'TechnicianEditUnits'])->name('technician.units.edit');
        Route::get('/technician/units/create', [TechnicianController::class, 'TechnicianCreateComputer'])->name('technician.units.create');
        Route::post('/technician/units', [TechnicianController::class, 'TechnicianStoreComputer'])->name('technician.units.store');
        Route::delete('/technician/units/{id}', [TechnicianController::class, 'TechniciandeleteSystemUnit'])
            ->name('technician.units.delete');
        // Peripherals
// Edit peripheral
        Route::get('/technician/peripherals/{id}/edit', [TechnicianController::class, 'TechnicianEditPeripherals'])
            ->name('technician.peripherals.edit');

        // Update peripheral
        Route::put('/technician/peripherals/{id}', [TechnicianController::class, 'TechnicianUpdatePeripherals'])
            ->name('technician.peripherals.update');
        Route::get('/technician/peripherals/create/', [TechnicianController::class, 'TechnicianCreatePeripherals'])->name('technician.peripherals.create');
        Route::post('/technician/peripherals', [TechnicianController::class, 'TechnicianStorePeripherals'])->name('technician.peripherals.store');
        Route::delete(
    '/technician/peripherals/{id}',
    [TechnicianController::class, 'DeletePeripheral']
)->name('technician.peripherals.delete');

        Route::get('/technician/equipments/{equipment}/edit', [TechnicianController::class, 'TechnicianEditEquipments'])->name('technician.equipments.edit');
        Route::get('/technician/equipments/create', [TechnicianController::class, 'TechnicianCreateEquipments'])->name('technician.equipments.create');
        Route::post('/technician/equipments', [TechnicianController::class, 'TechnicianStoreEquipments'])->name('technician.equipments.store');
         Route::get('/technician/equipments/{id}/edit', [TechnicianController::class, 'TechnicianEditEquipments'])
            ->name('technician.Equipments.edit');

        // Update peripheral
        Route::put('/technician/equipments/{id}', [TechnicianController::class, 'TechnicianUpdateEquipments'])->name('technician.equipments.update');

        Route::delete(
        '/technician/equipments/{id}',
        [TechnicianController::class, 'technicianDeleteEquipment']
    )->name('technician.equipments.delete');


    /*

    //Route::get('/rooms', [TechnicianController::class, 'showRooms'])->name('technician.rooms');
    Route::post('/rooms', [TechnicianController::class, 'createRoom'])->name('technician.rooms.create');
    Route::put('/rooms/{id}', [TechnicianController::class, 'editRoom'])->name('technician.rooms.update');
    Route::delete('/rooms/{id}', [TechnicianController::class, 'deleteRoom'])->name('technician.rooms.delete');
*/
    // Rooms

    /*
     Route::get('/units', [TechnicianController::class, 'showAllUnits'])->name('technician.units');
    Route::post('/units', [TechnicianController::class, 'addSystemUnit'])->name('technician.units.create');
    Route::put('/units/{id}', [TechnicianController::class, 'editSystemUnit'])->name('technician.units.update');
    Route::delete('/units/{id}', [TechnicianController::class, 'deleteSystemUnit'])->name('technician.units.delete');*/
    // System Units
   /*  // Peripherals
    Route::get('/peripherals', [TechnicianController::class , 'showAllPeripherals'])->name('technician.peripherals');
    Route::get('/peripherals/create', [TechnicianController::class, 'createPeripherals'])->name('technician.peripherals.createForm');
    Route::post('/peripherals', [TechnicianController::class, 'addPeripheral'])->name('technician.peripherals.create');
    Route::put('/peripherals/{id}', [TechnicianController::class, 'updatePeripheral'])->name('technician.peripherals.update');
    Route::delete('/peripherals/{id}', [TechnicianController::class, 'deletePeripheral'])->name('technician.peripherals.delete'); */

   /* // Equipments
    Route::get('/equipments', [TechnicianController::class, 'showAllRoomEquipments'])->name('technician.equipments');
    Route::get('/equipments/create', [TechnicianController::class, 'createEquipments'])->name('technician.equipments.createForm');
    Route::post('/equipments', [TechnicianController::class, 'addEquipment'])->name('technician.equipments.create');
    Route::put('/equipments/{id}', [TechnicianController::class, 'updateEquipment'])->name('technician.equipments.update');
    Route::delete('/equipments/{id}', [TechnicianController::class, 'deleteEquipment'])->name('technician.equipments.delete');
  */


    // Dashboard APIs
    /*      Route::get('/dashboard-stats', [TechnicianController::class, "dashboardStats"])->name('technician.dashboard.stats');
    Route::get('/activity-logs', [TechnicianController::class, "activityLogs"])->name('technician.activity.logs');
    Route::get('/rooms-status', [TechnicianController::class, "roomsStatus"])->name('technician.rooms.status');
    Route::get('/equipment-condition', [TechnicianController::class, "equipmentCondition"])->name('technician.equipment.condition');
    Route::get('/equipment-condition-by-room', [TechnicianController::class, "equipmentConditionByRoom"])->name('technician.equipment.condition.by.room');*/

});



// =======================================================================
//                           GUEST
// =======================================================================
// =======================================================================
//                           GUEST
// =======================================================================
Route::middleware(['auth', 'role:guest'])->group(function () {

    Route::get('/guest/dashboard', [GuestDashboardController::class, 'dashboard'])
        ->name('guest.dashboard');

    Route::get('/guest/{roomPath}/scan', [GuestDashboardController::class, 'showScannedRoom'])
        ->where('roomPath', '.*')
        ->name('guest.room.show');

    Route::get('/guest/{roomPath}', [GuestDashboardController::class, 'ShowGuestDashboard'])
        ->where('roomPath', '.*')
        ->name('guest.ScannedRoom.dashboard'); // <-- fix

    Route::get('/{room}/units/{unit}', [GuestDashboardController::class, 'GuestshowUnit'])
        ->scopeBindings()
        ->name('guest.units.show');

    Route::get('/{room}/peripherals/{peripheral}', [GuestDashboardController::class, 'showPeripherals'])
        ->scopeBindings() // 🔹 Important
        ->name('guest.peripherals.show');
Route::get('{room}/equipments/{equipment}', [GuestDashboardController::class, 'GuestshowRoomEquipments'])
    ->scopeBindings() // allows Equipment to be scoped under Room
    ->name('guest.equipments.show');
});



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
