<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Peripheral;
use App\Models\Room;
use App\Models\SystemUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;
class PeripheralController extends Controller
{
  public function index(Request $request)
{
    $peripherals = Peripheral::with('room')
        ->when($request->search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('peripheral_code', 'like', "%{$search}%")
                  ->orWhere('type', 'like', "%{$search}%")
                  ->orWhere('serial_number', 'like', "%{$search}%")
                  ->orWhere('condition', 'like', "%{$search}%")
                  ->orWhereHas('room', fn($qr) => $qr->where('room_number', 'like', "%{$search}%"))
                  ->orWhere('unit_code', 'like', "%{$search}%");
            });
        })
        ->when($request->filled('type'), fn($q) => $q->where('type', $request->type))
        ->when($request->filled('serial_number'), fn($q) => $q->where('serial_number', $request->serial_number))
        ->when($request->filled('condition'), fn($q) => $q->where('condition', $request->condition))
        ->when($request->filled('room_id'), fn($q) => $q->where('room_id', $request->room_id))
        ->when($request->filled('unit_code'), fn($q) => $q->where('unit_code', $request->unit_code))
        ->get();

    $rooms = Room::select('id', 'room_number')->get();
    $units = SystemUnit::select('id', 'unit_code')->get();

    return Inertia::render('Admin/PeripheralsPage', [
        'peripherals'    => $peripherals,
        'search'         => $request->search,
        'existingRooms'  => $rooms,
        'existingUnits'  => $units,
        'filters'        => $request->only(['type','serial_number','condition','room_id','unit_code']),
    ]);
}


    public function create()
    {
        $rooms = Room::select('id', 'room_number')->get();
        $units = SystemUnit::select('id', 'unit_code', 'room_id')->get();

        // For simplicity, brands and models can come from Peripheral distinct columns
        $brands = Peripheral::distinct()->pluck('brand')->filter()->values()->all();
        $models = Peripheral::distinct()->pluck('model')->filter()->values()->all();

        return inertia('Admin/Peripherals/AddPeripheral', [
            'existingRooms'  => $rooms,
            'existingUnits'  => $units,
            'existingBrands' => $brands,
            'existingModels' => $models,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type'          => 'required|string|max:255',
            'brand'         => 'nullable|string|max:255',
            'model'         => 'nullable|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'condition'     => 'required|string|max:255',
            'room_number'   => 'required|string|max:255',
            'unit_code'     => 'required|string|max:255',
        ]);

        // Find or create the room by room_number
        $room = Room::firstOrCreate(['room_number' => $validated['room_number']]);

        // Restriction: No duplicate peripheral type in the same unit of the same room
        $existingPeripheral = Peripheral::where('room_id', $room->id)
            ->where('unit_code', $validated['unit_code'])
            ->where('type', $validated['type'])
            ->first();

        if ($existingPeripheral) {
            return redirect()->back()->withErrors([
                'type' => "A {$validated['type']} already exists in Room {$validated['room_number']} Unit {$validated['unit_code']}."
            ])->withInput();
        }

        // Generate auto-incremented peripheral code (PRF-001, PRF-002, ...)
        $lastPeripheral = Peripheral::orderBy('id', 'desc')->first();
        if ($lastPeripheral && preg_match('/PRF-(\d+)/', $lastPeripheral->peripheral_code, $matches)) {
            $lastNumber = (int)$matches[1];
            $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '001';
        }

        $peripheralCode = 'PRF-' . $newNumber;

        // Create the peripheral
        Peripheral::create([
            'type'           => $validated['type'],
            'brand'          => $validated['brand'] ?? null,
            'model'          => $validated['model'] ?? null,
            'serial_number'  => $validated['serial_number'] ?? null,
            'condition'      => $validated['condition'],
            'room_id'        => $room->id,
            'room_number'    => $validated['room_number'], // Optional
            'unit_code'      => $validated['unit_code'],
            'peripheral_code'=> $peripheralCode,
            'qr_code_path'   => $peripheralCode, // Store code for QR generation
        ]);

        return redirect()->route('peripherals.index')->with('success', 'Peripheral added successfully.');
    }

    public function edit($id)
    {
        $peripheral = Peripheral::with('room')->findOrFail($id);

        $rooms = Room::select('id', 'room_number')->get();
        $units = SystemUnit::select('id', 'unit_code', 'room_id')->get();
        // dd($rooms);
        // dd($units);

        return Inertia::render('Admin/Peripherals/EditPeripheral', [
            'peripheral' => $peripheral,
            'rooms'      => $rooms,
            'units'      => $units,
        ]);
    }

    public function update(Request $request, $id)
    {
        $peripheral = Peripheral::findOrFail($id);

        $validated = $request->validate([
            'type'          => 'required|string|max:255',
            'brand'         => 'nullable|string|max:255',
            'model'         => 'nullable|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'condition'     => 'required|string|max:255',
            'room_id'       => 'required|exists:rooms,id',
            'unit_code'     => 'required|string|max:255',
        ]);

        $peripheral->update($validated);

        return redirect()->route('peripherals.index')->with('success', 'Peripheral updated successfully.');
    }

    public function destroy($id)
    {
        Peripheral::destroy($id);

        return redirect()->route('peripherals.index')->with('success', 'Peripheral deleted successfully.');
    }

    // ✅ Admin view
    public function show($id)
    {
        $peripheral = Peripheral::with('room')->findOrFail($id);

        return Inertia::render('Admin/Peripherals/ViewPeripheral', [
            'peripheral' => $peripheral
        ]);
    }

    // ✅ Faculty view
    public function showPeripherals(Room $room, $peripheralId)
{
    $room->load(['equipments', 'systemUnits', 'peripherals']);

    // Explicitly load the peripheral by ID
    $peripheral = Peripheral::findOrFail($peripheralId);

    return Inertia::render('Faculty/FacultyPeripheralsView', [
        'room'        => $room,
        'peripheral'  => $peripheral, // now guaranteed to have unit_code
        'user'        => Auth::user(),
        'equipments'  => $room->equipments,
        'systemUnits' => $room->systemUnits,
        'peripherals' => $room->peripherals,
    ]);
}

}
