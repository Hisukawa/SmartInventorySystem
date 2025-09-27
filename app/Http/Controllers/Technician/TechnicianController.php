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

class TechnicianController extends Controller
{

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
}
