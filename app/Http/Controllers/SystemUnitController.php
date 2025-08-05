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
            'room' => 'nullable|string',
            'room_id' => 'required|exists:rooms,id',
        ]);

        SystemUnit::create($validated);

        return redirect()->back()->with('message', 'System unit added successfully!');
    }

    // Update System Unit
    public function update(Request $request, $id)
    {
        $unit = SystemUnit::findOrFail($id);
        $unit->update($request->all());
        return back()->with('success', 'Unit updated successfully.');
    }

    // Delete System Unit
    public function destroy($id)
    {
        $unit = SystemUnit::findOrFail($id);
        $unit->delete();
        return back()->with('success', 'Unit deleted successfully.');
    }
}
