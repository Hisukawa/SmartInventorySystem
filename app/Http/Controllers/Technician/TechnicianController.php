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

use App\Models\SystemUnit;
use Illuminate\Validation\Rule;


class TechnicianController extends Controller
{
    //

      public function dashboard()
    {
        return Inertia::render('Technician/Technician-Dashboard', [
            'user' => Auth::user(),
        ]);
    }



    public function showRooms(){
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


public function showAllRoomEquipments(){
   $equipments = Equipment::with('room')->get();
   $room = Room::all();

   return  Inertia::render('Technician/Technician-show-all-equipments', [
    'equipments' => $equipments,
    'existingRooms' => $room,
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

}