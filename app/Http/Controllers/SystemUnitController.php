<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\SystemUnit;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SystemUnitController extends Controller
{
       public function index(Request $request)
{
    $query = SystemUnit::with('room');

    // ✅ List of filterable fields
    $filterable = [
        'room_id',
        'unit_code',
        'processor',
        'ram',
        'storage',
        'gpu',
        'motherboard',
        'condition',
    ];

    // ✅ Apply filters dynamically
    foreach ($filterable as $field) {
        $value = $request->get($field);
        if (!empty($value) && $value !== 'all') {
            $query->where($field, $value);
        }
    }

    // ✅ Apply search filter
    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
            $q->where('unit_code', 'LIKE', "%{$search}%")
              ->orWhereHas('room', function ($q2) use ($search) {
                  $q2->where('room_number', 'LIKE', "%{$search}%");
              });
        });
    }

    // ✅ Fetch results
    $units = $query->get();
    $rooms = Room::select('id', 'room_number')->get();

    return Inertia::render('SystemUnits/UnitPage', [
        'units'   => $units,
        'rooms'   => $rooms,
        'filters' => $request->all(), // ✅ pass back filters to keep state in frontend
    ]);
}



    // Store System Unit
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
            'processor' => 'required|string',
            'ram' => 'required|string',
            'storage' => 'required|string',
            'gpu' => 'required|string',
            'motherboard' => 'required|string',
            'condition' => 'required|string',
            'room_id' => 'required|exists:rooms,id',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // 🔹 FIXED: Ensure unit_code is always in "UNIT-XX" format
        $unitCode = strtoupper($validated['unit_code']);
        if (!str_starts_with($unitCode, 'PC-')) {
            $unitCode = 'PC-' . $unitCode;
        }
        $validated['unit_code'] = $unitCode;

        // 🔹 FIXED: Always lowercase unit_path (clean URLs)
        $validated['unit_path'] = strtolower(
            "isu-ilagan/ict-department/room-{$room->room_number}/{$unitCode}"
        );

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

        $room = Room::findOrFail($request->room_id);

        // 🔹 FIXED: Apply the same UNIT-XX normalization as store()
        $unitCode = strtoupper($validated['unit_code']);
        if (!str_starts_with($unitCode, 'PC-')) {
            $unitCode = 'PC-' . $unitCode;
        }
        $validated['unit_code'] = $unitCode;

        // 🔹 FIXED: Keep unit_path lowercase for URLs
        $validated['unit_path'] = strtolower(
            "isu-ilagan/ict-department/room-{$room->room_number}/{$unitCode}"
        );

        $unit->update($validated);

        return back()->with('success', 'Unit updated successfully.');
    }



    // Delete System Unit
    public function destroy($id)
    {
        // ✅ No change needed here, works fine with ID
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


    public function showUnitsDetails($unit_path){
        $unit = SystemUnit::with('room')->where('unit_path', $unit_path)->firstOrFail();

        return Inertia::render('OtherUser/UnitDetails', [
            'unit' => $unit,
        ]);
    }

}
