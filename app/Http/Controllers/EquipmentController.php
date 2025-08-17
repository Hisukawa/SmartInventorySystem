<?php
namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    public function index()
    {
        $equipments = Equipment::with('room')->get();

        return Inertia::render('Admin/Equipments/EquipmentsPage', [
            'equipments' => $equipments,
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
            'type' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'condition' => 'required|string',
            'room_number' => 'required|string',
        ]);

        // Auto-generate Equipment Code
        $last = Equipment::latest('id')->first();
        $nextCode = 'EQP-' . str_pad(($last ? $last->id + 1 : 1), 2, '0', STR_PAD_LEFT);

        $validated['equipment_code'] = $nextCode;

        Equipment::create($validated);

        return redirect()->route('equipments.index')->with('success', 'Equipment added successfully.');
    }

    public function show(Equipment $equipment)
    {
        return Inertia::render('Admin/Equipments/Show', [
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
            'type' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'condition' => 'required|string',
            'room_number' => 'required|string',
        ]);

        $equipment->update($validated);

        return redirect()->route('equipments.index')->with('success', 'Equipment updated successfully.');
    }

    public function destroy(Equipment $equipment)
    {
        $equipment->delete();

        return redirect()->route('equipments.index')->with('success', 'Equipment deleted successfully.');
    }
}
