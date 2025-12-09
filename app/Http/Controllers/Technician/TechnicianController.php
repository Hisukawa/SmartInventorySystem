<?php

namespace App\Http\Controllers\Technician;

use App\Models\UserAddedRooms; // make sure to import the model
use Illuminate\Support\Facades\DB; // optional for transaction

use App\Models\UserAddedUnits;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Room;
use App\Models\Peripheral;
use App\Models\Equipment;
use App\Models\UserAddedPeripherals;
use App\Models\UserAddedEquipments;
use App\Models\SystemUnit;
use Illuminate\Validation\Rule;
use App\Models\Report;
use App\Models\User;
use App\Models\RoomStatus;
class TechnicianController extends Controller
{


        public function ShowScannedRoom(Request $request, $encodedRoomPath)
    {
        $roomPath = urldecode($encodedRoomPath);
        $room     = Room::where('room_path', $roomPath)->firstOrFail();
        $user     = Auth::user();

      // Check if there’s already an active log for this faculty in this room
        $existingStatus = RoomStatus::where('room_id', $room->id)
            ->where('scanned_by', $user->id)
            ->where('is_active', 1)
            ->first();

        if (!$existingStatus) {
            RoomStatus::create([
                'room_id'    => $room->id,
                'scanned_by' => $user->id,
                'is_active'  => 1,
            ]);
        }

        $condition = $request->query('condition');
        $unitCode  = $request->query('unit_code');
        $search    = $request->query('search');
        $type      = $request->query('type');

        // Equipments
        $equipments = Equipment::with('room')
            ->where('room_id', $room->id)
            ->when($condition, fn($q) => $q->where('condition', $condition))
            ->when($type, fn($q) => $q->where('type', $type))
            ->when($search, fn($q) => $q->where('equipment_code', 'like', "%$search%"))
            ->get()
            ->map(fn($e) => [
                'id' => $e->id,
                'name' => $e->equipment_code,
                'condition' => $e->condition ?? 'Good',
                'type' => $e->type,
                'room_path' => $room->room_path,
                'room_number' => $e->room?->room_number,
            ]);

        // System Units
        $systemUnits = SystemUnit::where('room_id', $room->id)
            ->when($condition, fn($q) => $q->where('condition', $condition))
            ->when($unitCode, fn($q) => $q->where('unit_code', $unitCode))
            ->when($search, fn($q) => $q->where('unit_code', 'like', "%$search%"))
            ->get()
            ->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->unit_code,
                'condition' => $s->condition ?? 'Good',
                'room_path' => $room->room_path,
            ]);

        // Peripherals
        $peripherals = Peripheral::with('unit')
            ->where('room_id', $room->id)
            ->when($condition, fn($q) => $q->where('condition', $condition))
        ->when($type, fn($q) => $q->where('type', $type))
    ->when($unitCode, fn($q) => $q->whereHas('unit', fn($sub) => $sub->where('unit_code', $unitCode)))
            ->when($search, fn($q) => $q->where('peripheral_code', 'like', "%$search%"))
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->peripheral_code,
                'condition' => $p->condition ?? 'Good',
                'type' => $p->type,
                'room_path' => $room->room_path,
                'unit_code' => $p->unit?->unit_code,
            ]);

        // Filter options
        $conditionOptions = collect()
            ->merge(Equipment::select('condition')->distinct()->pluck('condition'))
            ->merge(SystemUnit::select('condition')->distinct()->pluck('condition'))
            ->merge(Peripheral::select('condition')->distinct()->pluck('condition'))
            ->unique()
            ->filter()
            ->values();

        $unitCodeOptions = SystemUnit::where('room_id', $room->id)
            ->select('unit_code')
            ->distinct()
            ->pluck('unit_code');

        // NEW: Type options
       $typeOptions = [
    'equipments' => Equipment::select('type')->distinct()->pluck('type')->filter(),
    'peripherals' => Peripheral::select('type')->distinct()->pluck('type')->filter(),
];


        return Inertia::render('Technician/Technician-Scanned-Room', [
            'room' => $room,
            'equipments' => $equipments,
            'systemUnits' => $systemUnits,
            'peripherals' => $peripherals,
            'filters' => [
                'condition' => $condition,
                'unit_code' => $unitCode,
                'type' => $type, // pass the type filter
                'search' => $search,
            ],
            'filterOptions' => [
                'conditions' => $conditionOptions,
                'unit_codes' => $unitCodeOptions,
                'types' => $typeOptions, // pass types to frontend
            ],
            'auth' => ['user' => $user],
            'section' => $request->query('section', 'dashboard'),
        ]);
    }



public function ShowTechnicianDashboard($encodedRoomPath)
{
    $roomPath = urldecode($encodedRoomPath);
    $room = Room::where('room_path', $roomPath)->firstOrFail();
    $user = Auth::user();

    // Computers
    $systemUnits = SystemUnit::where('room_id', $room->id)->get();
    $computersCount = $systemUnits->count();
    $computersByCondition = $systemUnits->groupBy('condition')->map->count();

    // Peripherals
    $peripherals = Peripheral::where('room_id', $room->id)->get();
    $peripheralsCount = $peripherals->count();
    $peripheralsByType = $peripherals->groupBy('type')->map->count();
    $peripheralsByCondition = $peripherals->groupBy('condition')->map->count();

    // Group conditions by type for drill-down
    $peripheralsByTypeCondition = [];
    foreach ($peripheralsByType->keys() as $type) {
        $peripheralsByTypeCondition[$type] = $peripherals
            ->where('type', $type)
            ->groupBy('condition')
            ->map->count();
    }

    // Equipments
    $equipments = Equipment::where('room_id', $room->id)->get();
    $equipmentsCount = $equipments->count();
    // Group by equipment_name instead of type
    $equipmentsByName = $equipments->groupBy('equipment_name')->map->count();
    $equipmentsByCondition = $equipments->groupBy('condition')->map->count();

    // Group conditions by equipment_name for drill-down
    $equipmentsByNameCondition = [];
    foreach ($equipmentsByName->keys() as $name) {
        $equipmentsByNameCondition[$name] = $equipments
            ->where('equipment_name', $name)
            ->groupBy('condition')
            ->map->count();
    }

    return Inertia::render('Technician/TechnicianScannedRoomDashboard', [
        'room' => $room,
        'user' => $user,
        'stats' => [
            'computers' => [
                'total' => $computersCount,
                'by_condition' => $computersByCondition,
            ],
            'peripherals' => [
                'total' => $peripheralsCount,
                'by_type' => $peripheralsByType,
                'by_condition' => $peripheralsByCondition,
                'by_type_condition' => $peripheralsByTypeCondition,
            ],
            'equipments' => [
                'total' => $equipmentsCount,
                'by_name' => $equipmentsByName, // updated key
                'by_condition' => $equipmentsByCondition,
                'by_name_condition' => $equipmentsByNameCondition, // updated key
            ],
        ],
    ]);
}



    public function TechnicianshowUnit(Room $room, SystemUnit $unit)
{
     $room->load(['systemUnits', 'equipments', 'peripherals']);

    return Inertia::render('Technician/TechnicianUnitView', [
        'room' => $room,
        'unit' => $unit,
        'user' => Auth::user(),
        'equipments' => $room->equipments,
        'systemUnits' => $room->systemUnits,
        'peripherals' => $room->peripherals,
    ]);
}


public function showPeripherals(Room $room, Peripheral $peripheral)
{
    // Eager load the related SystemUnit
    $peripheral->load('unit');

    return Inertia::render('Technician/TechnicianPeripheralsView', [
        'room' => $room->load(['equipments', 'systemUnits', 'peripherals']), // load related data
        'peripheral' => $peripheral,
        'user' => Auth::user(),
        'equipments' => $room->equipments,
        'systemUnits' => $room->systemUnits,
        'peripherals' => $room->peripherals,
    ]);
}

public function TechnicianshowRoomEquipments(Room $room, Equipment $equipment)
{
    $room->load(['equipments', 'systemUnits', 'peripherals']);

    return Inertia::render('Technician/TechnicianEquipmentView', [
        'room'        => $room,
        'equipment'   => $equipment,
        'user'        => Auth::user(),
        'equipments'  => $room->equipments,
        'systemUnits' => $room->systemUnits,
        'peripherals' => $room->peripherals,
    ]);
}


        //Adding Unit 
  public function TechnicianCreateComputer(Request $request)
{
    $roomId = $request->query('room'); 
    $room = Room::findOrFail($roomId);

    $faculties = User::where('role', 'faculty')->get(); // or however you filter faculties

    return Inertia::render('Technician/Technician-Add-Pc', [
        'room' => $room,
        'user' => Auth::user(),
        'faculties' => $faculties, // <-- pass faculties to frontend
    ]);
}

   public function TechnicianStoreComputer(Request $request)
{
    $validated = $request->validate([
        'unit_code'         => [
            'required',
            'string',
            Rule::unique('system_units')->where(fn($query) => $query->where('room_id', $request->room_id)),
        ],
        'processor'         => 'nullable|string',
        'ram'               => 'nullable|string',
        'storage'           => 'nullable|string',
        'gpu'               => 'nullable|string',
        'motherboard'       => 'nullable|string',
        'condition'         => 'required|string',
        'condition_details' => 'nullable|string',
        'serial_number'     => 'nullable|string',
        'operating_system'  => 'nullable|string',
        'room_id'           => 'required|exists:rooms,id',
        'mr_id'             => 'required|exists:users,id',
    ]);

    $unitCode = $validated['unit_code'];
    $unitPath = "isu-ilagan/ict-department/system-unit-{$unitCode}";

    // Check if SystemUnit exists
    $existingUnit = SystemUnit::where('room_id', $validated['room_id'])
        ->where('unit_code', $unitCode)
        ->first();

    if ($existingUnit) {
        return back()->withErrors([
            'unit_code' => 'Unit code already exists in this room.',
        ]);
    }

    try {
        // Prepare data array for reuse
        $unitData = [
            'unit_code'         => $unitCode,
            'processor'         => $validated['processor'] ?? null,
            'ram'               => $validated['ram'] ?? null,
            'storage'           => $validated['storage'] ?? null,
            'gpu'               => $validated['gpu'] ?? null,
            'motherboard'       => $validated['motherboard'] ?? null,
            'condition'         => $validated['condition'],
            'condition_details' => $validated['condition_details'] ?? null,
            'serial_number'     => $validated['serial_number'] ?? null,
            'operating_system'  => $validated['operating_system'] ?? null,
            'room_id'           => $validated['room_id'],
            'mr_id'             => $validated['mr_id'],
        ];

        // Save to UserAddedUnits
        UserAddedUnits::create(array_merge($unitData, ['added_by' => Auth::id()]));

        // Save to SystemUnit (with unit_path)
        SystemUnit::create(array_merge($unitData, ['unit_path' => $unitPath]));

        return redirect()->back()->with('success', 'System Unit added successfully!');
    } catch (\Exception $e) {
        // Log full error for debugging
        \Log::error('TechnicianStoreComputer error: ' . $e->getMessage(), [
            'trace' => $e->getTraceAsString(),
            'request' => $request->all()
        ]);

        return back()->withErrors([
            'unit_code' => 'Unexpected error occurred while adding the system unit: ' . $e->getMessage(),
        ]);
    }
}



    public function TechnicianEditUnits($unit)
    {
        $systemUnit = SystemUnit::findOrFail($unit);
        $room = $systemUnit->room; // assuming you have a `room` relationship
        $user = auth()->user();

        return Inertia::render('Technician/Technician-Edit-Pc', [
            'unit' => $systemUnit,
            'room' => $room,
            'user' => $user,
        ]);
    }

public function TechniciandeleteSystemUnit($id)
{
    $systemUnit = SystemUnit::findOrFail($id);
    $userAddedUnit = UserAddedUnits::where('unit_code', $systemUnit->unit_code)
                                    ->where('room_id', $systemUnit->room_id)
                                    ->first();

    try {
        $systemUnit->delete();
        if ($userAddedUnit) {
            $userAddedUnit->delete();
        }

        return redirect()->back()->with('success', 'System Unit deleted successfully!');
    } catch (\Exception $e) {
        return back()->withErrors(['unit_code' => 'Error deleting system unit.']);
    }
}


public function TechnicianCreatePeripherals(Request $request)
{
    $roomId = $request->query('room'); // Get room from URL ?room=3
    $room = Room::find($roomId);

    if (!$room) {
        abort(404, "Room not found");
    }

    return Inertia::render('Technician/Technician-Add-Peripheral', [
        'room' => $room,
        'roomPath' => $room->room_path,
        'room_id' => $room->id,
        'user' => Auth::user(),
        'existingRooms' => Room::all(),
        'existingUnits' => SystemUnit::where('room_id', $roomId)->get(), // <-- filter by room
        'existingBrands' => Peripheral::distinct()->pluck('brand'),
        'existingModels' => Peripheral::distinct()->pluck('model'),
    ]);
}




    // EDIT SYSTEM UNIT
    public function TechnicianUpdateUnits(Request $request, $id)
    {
        $systemUnit = SystemUnit::findOrFail($id);
        $userAddedUnit = UserAddedUnits::where('unit_code', $systemUnit->unit_code)
                                        ->where('room_id', $systemUnit->room_id)
                                        ->first();

        // Validate input
        $validated = $request->validate([
            'unit_code'   => 'required|string|unique:system_units,unit_code,' . $id . ',id,room_id,' . $request->room_id,
            'processor'   => 'nullable|string',
            'ram'         => 'nullable|string',
            'storage'     => 'nullable|string',
            'gpu'         => 'nullable|string',
            'motherboard' => 'nullable|string',
            'condition'   => 'required|string',
            'room_id'     => 'required|exists:rooms,id',
        ]);

        try {
            // Update SystemUnit
            $systemUnit->update(array_merge($validated, [
                'unit_path' => "isu-ilagan/ict-department/system-unit-{$validated['unit_code']}"
            ]));

            // Update UserAddedUnits
            if ($userAddedUnit) {
                $userAddedUnit->update(array_merge($validated, ['added_by' => Auth::id()]));
            }

            return redirect()->back()->with('success', 'System Unit updated successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['unit_code' => 'Error updating system unit.']);
        }
    }
    public function TechnicianStorePeripherals(Request $request)
    {
        $validated = $request->validate([
            'type'          => 'required|string|max:255',
            'brand'         => 'nullable|string|max:255',
            'model'         => 'nullable|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'condition'     => 'required|string|max:255',
            'condition_details' => 'nullable|string|max:1000', // ✅ added here
            'room_id'       => 'required|exists:rooms,id',
            'unit_id'       => 'required|exists:system_units,id',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        $existingPeripheral = Peripheral::where('room_id', $room->id)
            ->where('unit_id', $validated['unit_id'])
            ->where('type', $validated['type'])
            ->first();

        if ($existingPeripheral) {
            return back()->withErrors([
                'type' => "A {$validated['type']} already exists in Room {$room->room_number} Unit {$validated['unit_id']}."
            ])->withInput();
        }

        // Generate peripheral code
        $lastPeripheral = Peripheral::orderBy('id', 'desc')->first();
        $newNumber = $lastPeripheral && preg_match('/PRF-(\d+)/', $lastPeripheral->peripheral_code, $matches)
            ? str_pad((int)$matches[1] + 1, 3, '0', STR_PAD_LEFT)
            : '001';
        $peripheralCode = 'PRF-' . $newNumber;

        $qrCodePath = strtolower("isu-ilagan/ict-department/room-{$room->room_number}/{$validated['unit_id']}/{$peripheralCode}");

        try {
            UserAddedPeripherals::create([
                'peripheral_code' => $peripheralCode,
                'type'            => $validated['type'],
                'brand'           => $validated['brand'] ?? null,
                'model'           => $validated['model'] ?? null,
                'serial_number'   => $validated['serial_number'] ?? null,
                'condition'       => $validated['condition'],
                    'condition_details'  => $validated['condition_details'] ?? null, // ✅ added here
                'room_id'         => $room->id,
                'unit_id'         => $validated['unit_id'],
                'added_by'        => Auth::id(),
                'qr_code_path'    => $qrCodePath,
            ]);

            Peripheral::create([
                'peripheral_code' => $peripheralCode,
                'type'            => $validated['type'],
                'brand'           => $validated['brand'] ?? null,
                'model'           => $validated['model'] ?? null,
                'serial_number'   => $validated['serial_number'] ?? null,
                'condition'       => $validated['condition'],
                  'condition_details'  => $validated['condition_details'] ?? null, // ✅ added here
                'room_id'         => $room->id,
                'unit_id'         => $validated['unit_id'],
                'qr_code_path'    => $qrCodePath,
            ]);

            return redirect()->back()->with('success', 'Peripheral added successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['type' => 'Failed to add peripheral. Please check your input.']);
        }
    }

    public function dashboard()
    {
        return Inertia::render('Technician/Technician-Dashboard', [
            'user' => Auth::user(),
        ]);
    }

    // 📊 Main stats (technician view)
    public function dashboardStats()
    {
        return response()->json([
            'totalRooms'       => Room::count(),
            'totalSystemUnits' => SystemUnit::count(),
            'totalPeripherals' => Peripheral::count(),
            'totalEquipments'  => Equipment::count(),

            // Room Occupancy
            'occupiedRooms'    => Room::whereHas('latestStatus', fn($q) => $q->where('is_active', true))->count(),

            // Reports
            'pendingRequests'  => Report::where('condition', '!=', 'Resolved')->count(),
            'forRepair'        => Report::whereIn('condition', ['For Repair', 'Defective'])->count(),

            // Extra stats
            'availablePeripherals' => Peripheral::where('condition', 'Good')->count(),
            // 'activeUsers'          => User::whereNotNull('email_verified_at')->count(),
            // 'totalUsers'           => User::count(),
        ]);
    }

    // 📝 Recent activity logs
    public function activityLogs()
    {
        $logs = Report::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($report) => [
                'user'      => $report->user?->name ?? 'Unknown',
                'action'    => $report->condition . ' - ' . ($report->remarks ?? 'No remarks'),
                'timestamp' => $report->created_at->format('Y-m-d H:i'),
            ]);

        return response()->json($logs);
    }

    // 🔧 Pending maintenance requests
    public function maintenanceRequests()
    {
        $requests = Report::where('condition', '!=', 'Resolved')
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($report) => [
                'equipment'   => 'EQP-' . $report->reportable_id,
                'issue'       => $report->condition,
                'reported_by' => $report->user?->name ?? 'Unknown',
            ]);

        return response()->json($requests);
    }

    // 🏫 Room occupancy widget
    public function roomsStatus()
    {
        $rooms = Room::with(['latestStatus.scannedBy'])->get();

        $occupiedCount = 0;
        $availableCount = 0;
        $details = [];

        foreach ($rooms as $room) {
            $isActive = (bool) ($room->latestStatus->is_active ?? false);

            if ($isActive) {
                $occupiedCount++;
            } else {
                $availableCount++;
            }

            $details[] = [
                'id'              => $room->id,
                'room_number'     => $room->room_number,
                'is_active'       => $isActive,
                'last_scanned_by' => $room->latestStatus?->scannedBy?->name,
                'last_scanned_at' => $room->latestStatus?->created_at,
                'faculty_photo'   => $room->latestStatus?->scannedBy?->photo,
            ];
        }

        return response()->json([
            'occupied'  => $occupiedCount,
            'available' => $availableCount,
            'details'   => $details,
        ]);
    }

    // 🖥 Equipment condition breakdown by type
    public function equipmentCondition()
    {
        $systemUnits = SystemUnit::select('condition')->get()
            ->groupBy('condition')
            ->map->count()
            ->toArray();

        $peripherals = Peripheral::select('condition')->get()
            ->groupBy('condition')
            ->map->count()
            ->toArray();

        $equipments = Equipment::select('condition')->get()
            ->groupBy('condition')
            ->map->count()
            ->toArray();

        return response()->json([
            'system_units' => $systemUnits,
            'peripherals'  => $peripherals,
            'equipments'   => $equipments,
        ]);
    }

    // 📊 Equipment condition by room
    public function equipmentConditionByRoom()
    {
        try {
            $rooms = Room::all();

            $data = $rooms->map(function ($room) {
                $systemUnits = SystemUnit::where('room_id', $room->id)
                    ->selectRaw('`condition`, COUNT(*) as total')
                    ->groupBy('condition')
                    ->pluck('total', 'condition')
                    ->toArray();

                $peripherals = Peripheral::where('room_id', $room->id)
                    ->selectRaw('`condition`, COUNT(*) as total')
                    ->groupBy('condition')
                    ->pluck('total', 'condition')
                    ->toArray();

                $equipments = Equipment::where('room_id', $room->id)
                    ->selectRaw('`condition`, COUNT(*) as total')
                    ->groupBy('condition')
                    ->pluck('total', 'condition')
                    ->toArray();

                $merged = [];

                foreach ([$systemUnits, $peripherals, $equipments] as $dataset) {
                    foreach ($dataset as $condition => $count) {
                        $merged[$condition] = ($merged[$condition] ?? 0) + $count;
                    }
                }

                return array_merge(['room' => $room->room_number], $merged);
            });

            return response()->json($data);
        } catch (\Throwable $e) {
            \Log::error("equipmentConditionByRoom error: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function showRooms()
    {
        $rooms = Room::all();

        return Inertia::render('Technician/TechnicianRoomPage', [
                    'rooms' => $rooms,
        ]);
    }

   // TechnicianController.php

    public function showAllUnits()
    {
        $units = SystemUnit::with('room')->get();
        $rooms = Room::all();

        return Inertia::render('Technician/Technician-show-all-units', [
            'units' => $units,
            'rooms' => $rooms,
        ]);
    }

    public function showAllPeripherals()
    {
        $peripherals = Peripheral::with(['room', 'unit'])->get();
        $rooms = Room::all();
        $units = SystemUnit::all();

        return Inertia::render('Technician/Technician-show-all-peripherals', [
            'peripherals' => $peripherals,
            'existingRooms' => $rooms,
            'existingUnits' => $units,
        ]);
    }

    public function createPeripherals(){
        $rooms = Room::select('id', 'room_number')->get();
            $units = SystemUnit::select('id', 'unit_code', 'room_id')->get();

            $brands = Peripheral::distinct()->pluck('brand')->filter()->values()->all();
            $models = Peripheral::distinct()->pluck('model')->filter()->values()->all();

            return inertia('Technician/Technician-Add-Peripherals', [
                'existingRooms'  => $rooms,
                'existingUnits'  => $units,
                'existingBrands' => $brands,
                'existingModels' => $models,
            ]);
    }

    public function showAllRoomEquipments()
    {
        $equipments = Equipment::with('room')->get();
        $room = Room::all();

        // ✅ get all distinct condition values from equipments table
        $conditions = Equipment::select('condition')
            ->distinct()
            ->pluck('condition');

        return Inertia::render('Technician/Technician-show-all-equipments', [
            'equipments'     => $equipments,
            'existingRooms'  => $room,
            'conditions'     => $conditions,
        ]);
    }

    public function createRoom(Request $request)
    {
        // Validate only the room number
        $validated = $request->validate([
            'room_number' => 'required|integer|unique:rooms,room_number',
        ]);

        $roomNumber = $validated['room_number'];
        $roomPath   = "isu-ilagan/ict-department/room-{$roomNumber}";

        try {
            // Insert into UserAddedRooms
            UserAddedRooms::create([
                'room_number' => $roomNumber,
                'room_path'   => $roomPath,
                'added_by'    => Auth::id(),
            ]);

            // Insert into Room
            $room = Room::create([
                'room_number' => $roomNumber,
                'room_path'   => $roomPath,
            ]);

            // Generate QR URL
            $qrUrl = url("/room/" . urlencode($roomPath));

            return redirect()->back()->with([
                'success' => 'Room added successfully!',
                'qrUrl'   => $qrUrl,
            ]);

        } catch (\Illuminate\Database\QueryException $e) {
            return back()->withErrors([
                'room_number' => 'Room number already exists or unexpected error.',
            ]);
        }
    }

    public function editRoom(Request $request, $id)
    {
        // Validate input
        $validated = $request->validate([
            'room_number' => 'required|integer|unique:rooms,room_number,' . $id,
        ]);

        $roomNumber = $validated['room_number'];
        $roomPath   = "isu-ilagan/ict-department/room-{$roomNumber}";

        try {
            // Update Room table
            $room = Room::findOrFail($id);
            $room->update([
                'room_number' => $roomNumber,
                'room_path'   => $roomPath,
            ]);

            //update UserAddedRooms table if you want to track the same room number
            $userRoom = UserAddedRooms::where('room_number', $room->room_number)->first();
            if ($userRoom) {
                $userRoom->update([
                    'room_number' => $roomNumber,
                    'room_path'   => $roomPath,
                ]);
            }

            return redirect()->back()->with('success', 'Room updated successfully!');
        } catch (\Illuminate\Database\QueryException $e) {
            return back()->withErrors([
                'room_number' => 'Error updating room. Room number may already exist.',
            ]);
        }
    }
        public function deleteRoom($id)
        {
            try {
                // Find the room
                $room = Room::findOrFail($id);

                // Delete from UserAddedRooms if it exists
                $userRoom = UserAddedRooms::where('room_number', $room->room_number)->first();
                if ($userRoom) {
                    $userRoom->delete();
                }

                // Delete from Room table
                $room->delete();

                return redirect()->back()->with('success', 'Room deleted successfully!');
            } catch (\Exception $e) {
                return back()->withErrors([
                    'room' => 'Error deleting room. It may not exist.',
                ]);
            }
        }

    public function addSystemUnit(Request $request)
    {
        $validated = $request->validate([
            'unit_code'   => [
                'required',
                'string',
                Rule::unique('system_units')->where(function ($query) use ($request) {
                    return $query->where('room_id', $request->room_id);
                }),
            ],
            'processor'   => 'nullable|string',
            'ram'         => 'nullable|string',
            'storage'     => 'nullable|string',
            'gpu'         => 'nullable|string',
            'motherboard' => 'nullable|string',
            'condition'   => 'required|string',
            'room_id'     => 'required|exists:rooms,id',
        ]);

        $unitCode = $validated['unit_code'];
        $unitPath = "isu-ilagan/ict-department/system-unit-{$unitCode}";

        try {
            UserAddedUnits::create([
                'unit_code'   => $unitCode,
                'processor'   => $validated['processor'] ?? null,
                'ram'         => $validated['ram'] ?? null,
                'storage'     => $validated['storage'] ?? null,
                'gpu'         => $validated['gpu'] ?? null,
                'motherboard' => $validated['motherboard'] ?? null,
                'condition'   => $validated['condition'],
                'room_id'     => $validated['room_id'],
                'added_by'    => Auth::id(),
            ]);

            SystemUnit::create([
                'unit_code'   => $unitCode,
                'unit_path'   => $unitPath,
                'processor'   => $validated['processor'] ?? null,
                'ram'         => $validated['ram'] ?? null,
                'storage'     => $validated['storage'] ?? null,
                'gpu'         => $validated['gpu'] ?? null,
                'motherboard' => $validated['motherboard'] ?? null,
                'condition'   => $validated['condition'],
                'room_id'     => $validated['room_id'],
            ]);

            return redirect()->back()->with('success', 'System Unit added successfully!');
        } catch (\Illuminate\Database\QueryException $e) {
            return back()->withErrors(['unit_code' => 'Unit code already exists in this room or unexpected error.']);
        }
    }

    // EDIT SYSTEM UNIT
    public function editSystemUnit(Request $request, $id)
    {
        $systemUnit = SystemUnit::findOrFail($id);
        $userAddedUnit = UserAddedUnits::where('unit_code', $systemUnit->unit_code)
                                        ->where('room_id', $systemUnit->room_id)
                                        ->first();

        // Validate input
        $validated = $request->validate([
            'unit_code'   => 'required|string|unique:system_units,unit_code,' . $id . ',id,room_id,' . $request->room_id,
            'processor'   => 'nullable|string',
            'ram'         => 'nullable|string',
            'storage'     => 'nullable|string',
            'gpu'         => 'nullable|string',
            'motherboard' => 'nullable|string',
            'condition'   => 'required|string',
            'room_id'     => 'required|exists:rooms,id',
        ]);

        try {
            // Update SystemUnit
            $systemUnit->update(array_merge($validated, [
                'unit_path' => "isu-ilagan/ict-department/system-unit-{$validated['unit_code']}"
            ]));

            // Update UserAddedUnits
            if ($userAddedUnit) {
                $userAddedUnit->update(array_merge($validated, ['added_by' => Auth::id()]));
            }

            return redirect()->back()->with('success', 'System Unit updated successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['unit_code' => 'Error updating system unit.']);
        }
    }

    public function deleteSystemUnit($id)
    {
        $systemUnit = SystemUnit::findOrFail($id);
        $userAddedUnit = UserAddedUnits::where('unit_code', $systemUnit->unit_code)
                                        ->where('room_id', $systemUnit->room_id)
                                        ->first();

        try {
            $systemUnit->delete();
            if ($userAddedUnit) {
                $userAddedUnit->delete();
            }

            return redirect()->back()->with('success', 'System Unit deleted successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['unit_code' => 'Error deleting system unit.']);
        }
    }

    public function addPeripheral(Request $request)
    {
        $validated = $request->validate([
            'type'          => 'required|string|max:255',
            'brand'         => 'nullable|string|max:255',
            'model'         => 'nullable|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'condition'     => 'required|string|max:255',
            'room_id'       => 'required|exists:rooms,id',
            'unit_id'       => 'required|exists:system_units,id',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        $existingPeripheral = Peripheral::where('room_id', $room->id)
            ->where('unit_id', $validated['unit_id'])
            ->where('type', $validated['type'])
            ->first();

        if ($existingPeripheral) {
            return back()->withErrors([
                'type' => "A {$validated['type']} already exists in Room {$room->room_number} Unit {$validated['unit_id']}."
            ])->withInput();
        }

        // Generate peripheral code
        $lastPeripheral = Peripheral::orderBy('id', 'desc')->first();
        $newNumber = $lastPeripheral && preg_match('/PRF-(\d+)/', $lastPeripheral->peripheral_code, $matches)
            ? str_pad((int)$matches[1] + 1, 3, '0', STR_PAD_LEFT)
            : '001';
        $peripheralCode = 'PRF-' . $newNumber;

        $qrCodePath = strtolower("isu-ilagan/ict-department/room-{$room->room_number}/{$validated['unit_id']}/{$peripheralCode}");

        try {
            UserAddedPeripherals::create([
                'peripheral_code' => $peripheralCode,
                'type'            => $validated['type'],
                'brand'           => $validated['brand'] ?? null,
                'model'           => $validated['model'] ?? null,
                'serial_number'   => $validated['serial_number'] ?? null,
                'condition'       => $validated['condition'],
                'room_id'         => $room->id,
                'unit_id'         => $validated['unit_id'],
                'added_by'        => Auth::id(),
                'qr_code_path'    => $qrCodePath,
            ]);

            Peripheral::create([
                'peripheral_code' => $peripheralCode,
                'type'            => $validated['type'],
                'brand'           => $validated['brand'] ?? null,
                'model'           => $validated['model'] ?? null,
                'serial_number'   => $validated['serial_number'] ?? null,
                'condition'       => $validated['condition'],
                'room_id'         => $room->id,
                'unit_id'         => $validated['unit_id'],
                'qr_code_path'    => $qrCodePath,
            ]);

            // ✅ Return Inertia with a flash message
            return Inertia::render('Technician/Technician-Add-Peripherals', [
                'flash' => [
                    'success' => 'Peripheral added successfully!',
                ],
                'existingRooms'  => Room::all(),
                'existingUnits'  => SystemUnit::all(),
                'existingBrands' => Peripheral::distinct()->pluck('brand'),
                'existingModels' => Peripheral::distinct()->pluck('model'),
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['type' => 'Failed to add peripheral. Please check your input.']);
        }
    }

    // Edit / Update peripheral
    public function updatePeripheral(Request $request, $id)
    {
        $peripheral = Peripheral::findOrFail($id);
        $userPeripheral = UserAddedPeripherals::where('peripheral_code', $peripheral->peripheral_code)->first();

        $validated = $request->validate([
            'type'          => 'required|string|max:255',
            'brand'         => 'nullable|string|max:255',
            'model'         => 'nullable|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'condition'     => 'required|string|max:255',
            'room_id'       => 'required|exists:rooms,id',
            'unit_id'       => 'required|exists:system_units,id',
        ]);

        try {
            // Update main table
            $peripheral->update($validated);

            // Update user added table if exists
            if ($userPeripheral) {
                $userPeripheral->update($validated);
            }


        return redirect()->back()->with('success', 'Peripheral updated successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['type' => 'Failed to update peripheral.']);
        }
    }

    // Delete peripheral
    public function deletePeripheral($id)
    {
        $peripheral = Peripheral::findOrFail($id);
        $userPeripheral = UserAddedPeripherals::where('peripheral_code', $peripheral->peripheral_code)->first();

        try {
            // Delete main table
            $peripheral->delete();

            // Delete user added table if exists
            if ($userPeripheral) {
                $userPeripheral->delete();
            }

            return redirect()->back()->with('success', 'Peripheral deleted successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['type' => 'Failed to delete peripheral.']);
        }
    }

    public function createEquipments()
    {
        return Inertia::render('Technician/Technician-Add-Equipment', [
            'existingRooms'     => Room::all(),

        ]);
    }

    public function addEquipment(Request $request)
    {
        $validated = $request->validate([
            'equipment_name' => 'required|string|max:255',
            'type'           => 'required|string|max:255',
            'brand'          => 'nullable|string|max:255',
            'condition'      => 'required|string|max:255',
            'condition_details'  => 'nullable|string|max:500', // <-- new
            'quantity'           => 'required|integer|min:1',   // <-- ne
            'room_id'        => 'nullable|exists:rooms,id',
        ]);

        $room = Room::findOrFail($validated['room_id']);
            // Generate equipment code
        $lastEquipment = Equipment::orderByRaw("CAST(SUBSTRING(equipment_code, 5) AS UNSIGNED) DESC")->first();

        $lastNumber = $lastEquipment
            ? (int) preg_replace('/[^0-9]/', '', $lastEquipment->equipment_code) // extract just the number
            : 0;

        $newNumber = $lastNumber + 1;

        $equipmentCode = 'EQP-' . $newNumber;



        // Generate QR code path
        $qrCodePath = $room
            ? strtolower("isu-ilagan/ict-department/room-{$room->room_number}/{$equipmentCode}")
            : strtolower("isu-ilagan/ict-department/{$equipmentCode}");

        try {
            // Save to UserAddedEquipments
            UserAddedEquipments::create([
                'equipment_code' => $equipmentCode,
                'equipment_name' => $validated['equipment_name'],
                'type'           => $validated['type'],
                'brand'          => $validated['brand'] ?? null,
                'condition'      => $validated['condition'],
                'condition_details' => $validated['condition_details'] ?? null,
                'quantity'          => $validated['quantity'],
                'room_id'        => $validated['room_id'] ?? null,
                'added_by'       => Auth::id(), // fallback if no auth
                'qr_code'        => $qrCodePath,
            ]);

            // Save to Equipment
            Equipment::create([
                'equipment_code' => $equipmentCode,
                'equipment_name' => $validated['equipment_name'],
                'type'           => $validated['type'],
                'brand'          => $validated['brand'] ?? null,
                'condition'      => $validated['condition'],
                'condition_details' => $validated['condition_details'] ?? null,
                'quantity'          => $validated['quantity'],
                'room_id'        => $validated['room_id'] ?? null,
                'qr_code'        => $qrCodePath,
            ]);

            // Redirect with success flash
            return redirect()
                ->route('technician.createEquipments')
                ->with('success', 'Equipment added successfully!');
        } catch (\Exception $e) {
            return back()->withErrors([
                'equipment_name' => 'Failed to add equipment: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Update equipment
     */
    public function updateEquipment(Request $request, $id)
    {
        $equipment = Equipment::findOrFail($id);
        $validated = $request->validate([
            'equipment_code' => 'required|string|max:255',
            'type'           => 'required|string|max:255',
            'brand'          => 'nullable|string|max:255',
            'condition'      => 'required|string|max:255',
            'room_id'        => 'nullable|exists:rooms,id',
        ]);

        $room = $validated['room_id'] ? Room::findOrFail($validated['room_id']) : null;

        // Update QR code path if room changes
        $qrCodePath = $room
            ? strtolower("isu-ilagan/ict-department/room-{$room->room_number}/{$equipment->equipment_code}")
            : strtolower("isu-ilagan/ict-department/{$equipment->equipment_code}");

        $equipment->update(array_merge($validated, ['qr_code' => $qrCodePath]));

        // Update UserAddedEquipments as well
        $userAdded = UserAddedEquipments::where('equipment_code', $equipment->equipment_code)->first();
        if ($userAdded) {
            $userAdded->update(array_merge($validated, ['qr_code' => $qrCodePath]));
        }

        return redirect()->back()->with('success', 'Equipment updated successfully!');
    }

    /**
     * Delete equipment
     */
    public function deleteEquipment($id)
    {
        $equipment = Equipment::findOrFail($id);

        // Delete from UserAddedEquipments as well
        UserAddedEquipments::where('equipment_code', $equipment->equipment_code)->delete();

        $equipment->delete();

        return redirect()->back()->with('success', 'Equipment deleted successfully!');
    }



    public function TechnicianEditPeripherals($id)
{
    $peripheral = Peripheral::findOrFail($id);
    $room = Room::find($peripheral->room_id);

    return Inertia::render('Technician/Technician-Edit-Peripheral', [
        'peripheral'    => $peripheral,
        'room'          => $room,
        'roomPath'      => $room->room_path,
        'room_id'       => $room->id,
        'user'          => Auth::user(),
        'existingRooms' => Room::all(),
        'existingUnits' => SystemUnit::all(),
        'existingBrands'=> Peripheral::distinct()->pluck('brand'),
        'existingModels'=> Peripheral::distinct()->pluck('model'),
    ]);
}

    public function TechnicianUpdatePeripherals(Request $request, $id)
    {
        $peripheral = Peripheral::findOrFail($id);
        $userPeripheral = UserAddedPeripherals::where('peripheral_code', $peripheral->peripheral_code)->first();

        $validated = $request->validate([
            'type'          => 'required|string|max:255',
            'brand'         => 'nullable|string|max:255',
            'model'         => 'nullable|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'condition'     => 'required|string|max:255',
            'room_id'       => 'required|exists:rooms,id',
            'unit_id'       => 'required|exists:system_units,id',
        ]);

        try {
            $peripheral->update($validated);

            if ($userPeripheral) {
                $userPeripheral->update($validated);
            }

            return redirect()->back()->with('success', 'Peripheral updated successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['type' => 'Failed to update peripheral.']);
        }
    }

     public function DeletePeripherals($id){
        $peripheral = Peripheral::findOrFail($id);
    $userPeripheral = UserAddedPeripherals::where('peripheral_code', $peripheral->peripheral_code)->first();

    try {
        // Delete main peripheral
        $peripheral->delete();

        // Delete associated user-added peripheral if exists
        if ($userPeripheral) {
            $userPeripheral->delete();
        }

        return redirect()->back()->with('success', 'Peripheral deleted successfully!');
    } catch (\Exception $e) {
        return back()->withErrors(['type' => 'Failed to delete peripheral.']);
    }
     }


public function TechnicianCreateEquipments(Request $request)
{
    $roomId = $request->query('room'); // Get ?room=ID
    $room = Room::find($roomId);

    if (!$room) {
        abort(404, "Room not found"); // <-- ensure room exists
    }

    return Inertia::render('Technician/Technician-Add-Equipments', [
        'room' => $room,
        'roomPath' => $room->room_path,
        'room_id' => $room->id,
        'existingRooms' => Room::all(),
        'user' => Auth::user(),
    ]);
}


    /**
     * Store new equipment
     */
public function TechnicianStoreEquipments(Request $request)
{
    $validated = $request->validate([
        'equipment_name' => 'required|string|max:255',
        'type'           => 'required|string|max:255',
        'brand'          => 'nullable|string|max:255',
        'condition'      => 'required|string|max:255',
        'room_id'        => 'nullable|exists:rooms,id',
    ]);

    $room = $validated['room_id'] ? Room::find($validated['room_id']) : null;

    // Generate unique equipment code
    $lastEquipment = Equipment::orderByRaw("CAST(SUBSTRING(equipment_code, 5) AS UNSIGNED) DESC")->first();
    $lastNumber = $lastEquipment ? (int) preg_replace('/[^0-9]/', '', $lastEquipment->equipment_code) : 0;
    $equipmentCode = 'EQP-' . ($lastNumber + 1);

    $qrCodePath = $room
        ? strtolower("isu-ilagan/ict-department/room-{$room->room_number}/{$equipmentCode}")
        : strtolower("isu-ilagan/ict-department/{$equipmentCode}");

    try {
        // Save both Equipment and UserAddedEquipments
        Equipment::create(array_merge($validated, [
            'equipment_code' => $equipmentCode,
            'qr_code' => $qrCodePath,
        ]));

        UserAddedEquipments::create(array_merge($validated, [
            'equipment_code' => $equipmentCode,
            'added_by' => Auth::id(),
            'qr_code' => $qrCodePath,
        ]));

        // Redirect back safely without needing a room query
        return redirect()->back()->with('success', 'Peripheral added successfully!');
    } catch (\Exception $e) {
        return back()->withErrors(['equipment_name' => 'Failed to add equipment: ' . $e->getMessage()]);
    }

    /**
     * Show the edit equipment page
     */
 }
  public function TechnicianEditEquipments($id)
{
    $equipment = Equipment::findOrFail($id);
    $room = $equipment->room; // assuming Equipment has room() relationship
    $user = Auth::user();

    return Inertia::render('Technician/Technician-Edit-Equipment', [
        'equipment' => $equipment,
        'room' => $room,
        'roomPath' => $room->room_path ?? null,
        'user' => $user,
        'existingRooms' => Room::all(),
    ]);
}

    /**
     * Update equipment
     */
  public function TechnicianUpdateEquipments(Request $request, $id)
{
    $equipment = Equipment::findOrFail($id);

    $validated = $request->validate([
        'equipment_name' => 'required|string|max:255',
        'type'           => 'required|string|max:255',
        'brand'          => 'nullable|string|max:255',
        'condition'      => 'required|string|max:255',
    ]);

    $room = $equipment->room; // room cannot change
    $qrCodePath = strtolower("isu-ilagan/ict-department/room-{$room->room_number}/{$equipment->equipment_code}");

    $equipment->update(array_merge($validated, ['qr_code' => $qrCodePath]));

    $userAdded = UserAddedEquipments::where('equipment_code', $equipment->equipment_code)->first();
    if ($userAdded) {
        $userAdded->update(array_merge($validated, ['qr_code' => $qrCodePath]));
    }

    return redirect()->back()->with('success', 'Equipment updated successfully!');
}

    /**
     * Delete equipment
     */
    public function technicianDeleteEquipment($id)
    {
        $equipment = Equipment::findOrFail($id);

        // Delete from UserAddedEquipments too
        UserAddedEquipments::where('equipment_code', $equipment->equipment_code)->delete();

        $equipment->delete();

        return redirect()->back()->with('success', 'Peripheral deleted successfully!');
    }

}
