<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class EquipmentController extends Controller
{
    public function index(Request $request)
    {
        $equipments = Equipment::with('room')
            ->when($request->filled('type'), fn($q) => $q->where('type', $request->type))
            ->when($request->filled('condition'), fn($q) => $q->where('condition', $request->condition))
            ->when($request->filled('room_id'), fn($q) => $q->where('room_id', $request->room_id))
            ->latest()
            ->get();

        $rooms = Room::select('id', 'room_number')->get();

        return Inertia::render('Admin/Equipments/EquipmentsPage', [
            'equipments'     => $equipments,
            'filters'        => $request->only(['type', 'condition', 'room_id']),
            'existingRooms'  => $rooms,
        ]);
    }

    public function create()
    {
        $rooms = Room::all();

        return Inertia::render('Admin/Equipments/AddEquipment', [
            'rooms' => $rooms,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipment_name' => 'required|string|max:255',
            'type'           => 'required|string|max:255',
            'brand'          => 'nullable|string|max:255',
            'condition'      => 'required|string',
            'room_id'        => 'required|exists:rooms,id',
        ]);

        // Find the room
        $room = Room::findOrFail($validated['room_id']);

        // Auto-generate Equipment Code
        $last = Equipment::latest('id')->first();
        $nextCode = 'EQP-' . str_pad(($last ? $last->id + 1 : 1), 2, '0', STR_PAD_LEFT);

        $validated['equipment_code'] = $nextCode;

        // ✅ Generate QR code path like peripherals
        $qrCodePath = strtolower("isu-ilagan/ict-department/room-{$room->room_number}/{$nextCode}");

        $validated['qr_code'] = $qrCodePath;

        Equipment::create($validated);

        return redirect()->route('equipments.create')->with('success', 'Equipment added successfully.');
    }

    public function show($equipment_code)
    {
        $equipment = Equipment::with('room')
            ->where('equipment_code', $equipment_code)
            ->firstOrFail();

        return Inertia::render('Admin/Equipments/ViewEquipment', [
            'equipment' => $equipment,
        ]);
    }

    public function edit($equipment_code)
    {
        $equipment = Equipment::where('equipment_code', $equipment_code)
            ->with('room') // load room relation
            ->firstOrFail();

        $rooms = Room::all(); // for dropdown

        return Inertia::render('Admin/Equipments/EditEquipmentPage', [
            'equipment' => $equipment,
            'rooms' => $rooms,
        ]);
    }


    public function update(Request $request, $equipment_code)
    {
        $equipment = Equipment::where("equipment_code", $equipment_code)->firstOrFail();

        $validated = $request->validate([
            'equipment_name' => 'required|string|max:255',
            'brand'          => 'nullable|string|max:255',
            'type'           => 'required|string|max:255',
            'condition'      => 'required|string|max:255',
            'room_id'        => 'required|exists:rooms,id',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // regenerate QR path
        $validated['qr_code'] = strtolower(
            "isu-ilagan/ict-department/room-{$room->room_number}/{$equipment->equipment_code}"
        );

        $equipment->update($validated);

        return redirect()->back()->with('success', 'Equipment updated successfully!');
    }





    public function destroy(Equipment $equipment)
    {
        $equipment->delete();

        return redirect()->route('equipments.index')->with('success', 'Equipment deleted successfully.');
    }

    public function showRoomEquipments(Room $room, $equipmentId)
    {
        $equipment = Equipment::findOrFail($equipmentId);

        if ($equipment->room_id !== $room->id) {
            abort(404, 'Equipment not found in this room.');
        }

        $room->load(['equipments', 'systemUnits', 'peripherals']);

        return Inertia::render('Faculty/FacultyEquipmentView', [
            'room'        => $room,
            'equipment'   => $equipment,
            'user'        => Auth::user(),
            'equipments'  => $room->equipments,
            'systemUnits' => $room->systemUnits,
            'peripherals' => $room->peripherals,
        ]);
    }

    // ✅ Public equipment details by QR path
    public function showEquipmentsDetails($equipment_code)
    {
        $equipment = Equipment::with('room')
            ->where('equipment_code', $equipment_code)
            ->firstOrFail();

        return Inertia::render('OtherUser/EquipmentsDetails', [
            'equipment' => $equipment,
        ]);
    }

    public function storeBulk(Request $request)
    {
        $request->validate([
            'equipments' => 'required|array',
            'equipments.*.equipment_name' => 'required|string|max:255',
            'equipments.*.type' => 'required|string',
            'equipments.*.brand' => 'required|string|max:255',
            'equipments.*.condition' => 'required|string',
            'equipments.*.room_id' => 'required|exists:rooms,id',
        ]);

        foreach ($request->equipments as $eq) {
            // Auto-generate equipment_code
            $last = Equipment::latest('id')->first();
            $nextCode = 'EQP-' . str_pad(($last ? $last->id + 1 : 1), 2, '0', STR_PAD_LEFT);

            // Optional: Handle duplicate equipment_name
            $baseName = $eq['equipment_name'];
            $counter = 1;
            while (Equipment::where('equipment_name', $eq['equipment_name'])->exists()) {
                $eq['equipment_name'] = $baseName . ' #' . $counter;
                $counter++;
            }

            // Find the room
            $room = Room::findOrFail($eq['room_id']);

            // Generate QR code path
            $qrCodePath = strtolower("isu-ilagan/ict-department/room-{$room->room_number}/{$nextCode}");

            $eq['equipment_code'] = $nextCode;
            $eq['qr_code'] = $qrCodePath;

            Equipment::create($eq);
        }

        // return redirect()->back()->with('success', "{$request->quantity} equipment(s) added successfully!");
        return redirect()->back()->with('success', 'Equipments added successfully!');


    }


}
