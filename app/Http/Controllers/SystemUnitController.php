<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\SystemUnit;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\User;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\SystemUnitImport;
use Illuminate\Database\QueryException;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Exports\SystemUnitsExport;

class SystemUnitController extends Controller
{
    public function index(Request $request)
    {
        $query = SystemUnit::with(['room', 'mr_to']);

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

    // Remove "room" from search if typed
    $searchNumber = preg_replace('/room\s*/i', '', $search);

    $query->where(function ($q) use ($search, $searchNumber) {
        $q->where('unit_code', 'LIKE', "%{$search}%")
          ->orWhereHas('room', function ($q2) use ($search, $searchNumber) {
              $q2->where('room_number', 'LIKE', "%{$search}%")
                 ->orWhere('room_number', 'LIKE', "%{$searchNumber}%");
          })
          ->orWhereHas('mr_to', function ($q3) use ($search) {
              $q3->where('name', 'LIKE', "%{$search}%");
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


    public function create()
    {
        $faculties = User::where('role', 'faculty')->get();
        return Inertia::render('SystemUnits/Add-Pc', [
            'rooms' => Room::all(),
            'faculties' => $faculties,

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
            'serial_number' => 'required|string',
            'operating_system' => 'nullable|string',
            'processor' => 'required|string',
            'ram' => 'required|string',
            'storage' => 'required|string',
            'gpu' => 'required|string',
            'motherboard' => 'required|string',
            'os' => 'nullable|string',
            'condition' => 'required|string',
            'condition_details' => 'nullable|string',
            'room_id' => 'required|exists:rooms,id',

            // ✅ M.R must be a user with faculty role
            'mr_id' => [
                'nullable',
                Rule::exists('users', 'id')->where(function ($query) {
                    $query->where('role', 'faculty');
                }),
            ],
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
            'operating_system' => 'nullable|string',
            'condition' => 'nullable|string',
             'condition_details' => 'nullable|string|max:1000', // ✅ NEW FIELD
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

    public function show($unit_path)
    {
        $unit = SystemUnit::with(['room', 'mr_to'])
            ->where('unit_path', $unit_path)
            ->orderByDesc('updated_at')
            ->firstOrFail();

        return Inertia::render('SystemUnits/ViewUnit', [
            'unit' => $unit,
        ]);
    }



    public function showUnitsDetails($unit_path){
       $unit = SystemUnit::with(['room', 'mr_to']) // ✅ Include material responsible user
                        ->where('unit_path', $unit_path)
                        ->firstOrFail();

        return Inertia::render('OtherUser/UnitDetails', [
            'unit' => $unit,
        ]);
    }


    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        try {
            Excel::import(new SystemUnitImport, $request->file('file'));
            return response()->json(['message' => 'System units imported successfully!']);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }


    public function template()
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="system_units_template.csv"',
        ];

        $columns = [
            'unit_code',
            'room_id',
            'serial_number',
            'processor',
            'ram',
            'storage',
            'gpu',
            'motherboard',
            'condition',
            'mr_id',
            'condition_details'
        ];

        $callback = function() use ($columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }


    public function export()
    {
        return Excel::download(new SystemUnitsExport, 'system_units_export.xlsx');
    }
}
