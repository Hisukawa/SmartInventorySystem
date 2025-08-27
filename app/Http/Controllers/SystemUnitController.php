<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\SystemUnit;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SystemUnitController extends Controller
{
    public function index()
    {
        $units = SystemUnit::with('room')->get();
        $rooms = Room::select('id', 'room_number')->get();

        return Inertia::render('SystemUnits/UnitPage', [
            'units' => $units,
            'rooms' => $rooms,
        ]);
    }

    public function create()
    {
        $rooms = Room::all();
        return inertia('Units/CreateUnit', [
            'rooms' => $rooms,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_code' => [
                'required',
                'string',
                Rule::unique('system_units')->where(function ($query) use ($request) {
                    return $query->where('room_id', $request->room_id);
                }),
            ],
            'processor' => 'nullable|string',
            'ram' => 'nullable|string',
            'storage' => 'nullable|string',
            'gpu' => 'nullable|string',
            'motherboard' => 'nullable|string',
            'condition' => 'nullable|string',
            'room_id' => 'required|exists:rooms,id',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // 🔹 Ensure no duplicate "unit-"
        $unitCode = preg_replace('/^unit-?/i', '', $validated['unit_code']);
        $validated['unit_code'] = $unitCode;

        // 🔹 Always build path with a single "unit-"
        $validated['unit_path'] = strtolower("isu-ilagan/ict-department/room-{$room->room_number}/unit-{$unitCode}");

        SystemUnit::create($validated);

        return redirect()->back()->with('message', 'System unit added successfully!');
    }




    // Update System Unit
    public function update(Request $request, $id)
    {
        $unit = SystemUnit::findOrFail($id);

        $validated = $request->validate([
            'unit_code' => [
                'required',
                'string',
                Rule::unique('system_units')->where(function ($query) use ($request, $id) {
                    return $query->where('room_id', $request->room_id)
                                ->where('id', '!=', $id);
                }),
            ],
            'processor' => 'nullable|string',
            'ram' => 'nullable|string',
            'storage' => 'nullable|string',
            'gpu' => 'nullable|string',
            'motherboard' => 'nullable|string',
            'condition' => 'nullable|string',
            'room_id' => 'required|exists:rooms,id',
        ]);

        // 🔹 Rebuild unit_path if code or room changed
        $room = Room::findOrFail($request->room_id);
        $validated['unit_path'] = strtolower("isu-ilagan/ict-department/room-{$room->room_number}/unit-{$validated['unit_code']}");

        $unit->update($validated);

        return back()->with('success', 'Unit updated successfully.');
    }


    // Delete System Unit
    public function destroy($id)
    {
        $unit = SystemUnit::findOrFail($id);
        $unit->delete();
        return back()->with('success', 'Unit deleted successfully.');
    }

    public function show($unit_code)
    {
        $unit = SystemUnit::with('room')
            ->where('unit_code', $unit_code)
            ->firstOrFail();

        return Inertia::render('SystemUnits/ViewUnit', [
            'unit' => $unit
        ]);
    }

}
