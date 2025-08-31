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
            'equipments' => $equipments,
            'filters'    => $request->only(['type', 'condition', 'room_id']),
            'existingRooms' => $rooms,
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
            'type' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'condition' => 'required|string',
            'room_number' => 'required|string',
        ]);

        // Auto-generate Equipment Code
        $last = Equipment::latest('id')->first();
        $nextCode = 'EQP-' . str_pad(($last ? $last->id + 1 : 1), 2, '0', STR_PAD_LEFT);

        $validated['equipment_code'] = $nextCode;

        Equipment::create($validated); // Now this works

        return redirect()->route('equipments.index')->with('success', 'Equipment added successfully.');
    }



    public function show($equipment_code)
    {
        $equipment = Equipment::where('equipment_code', $equipment_code)
            ->firstOrFail();

        return Inertia::render('Admin/Equipments/ViewEquipment', [
            'equipment' => $equipment,
        ]);
    }

    public function edit(Equipment $equipment)
    {
        $rooms = Room::all();

        return Inertia::render('Admin/Equipments/Edit', [
            'equipment' => $equipment,
            'rooms' => $rooms,
        ]);
    }

    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'equipment_code' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'condition' => 'required|string|max:255',
            'room_id' => 'required|exists:rooms,id',
        ]);

        $equipment->update($validated);

        return redirect()->back()->with('success', 'Equipment updated successfully.');
    }


    public function destroy(Equipment $equipment)
    {
        $equipment->delete();

        return redirect()->route('equipments.index')->with('success', 'Equipment deleted successfully.');
    }

    public function showRoomEquipments(Room $room, Equipment $equipment)
    {
        $room->load(['equipments', 'systemUnits', 'peripherals']);

        return Inertia::render('Faculty/FacultyEquipmentView', [
            'room' => $room,
            'equipment' => $equipment,
            'user' => Auth::user(),
            'equipments' => $room->equipments,
            'systemUnits' => $room->systemUnits,
            'peripherals' => $room->peripherals,
        ]);
    }
}
