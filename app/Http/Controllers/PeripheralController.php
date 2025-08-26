<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Peripheral;
use App\Models\Room;
use App\Models\SystemUnit;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;

class PeripheralController extends Controller
{
    public function index()
    {
        $peripherals = Peripheral::with('room')->get();
        return inertia('Admin/PeripheralsPage', [
            'peripherals' => $peripherals
        ]);
    }

    public function create()
    {
        $existingRooms = Room::select('id', 'room_number')->get();
        $existingUnits = SystemUnit::select('id', 'unit_code', 'room_id')->get();

        // For simplicity, brands and models can come from Peripheral distinct columns
        $existingBrands = Peripheral::distinct()->pluck('brand')->filter()->values()->all();
        $existingModels = Peripheral::distinct()->pluck('model')->filter()->values()->all();

        return inertia('Admin/Peripherals/AddPeripheral', [
            'existingRooms' => $existingRooms,
            'existingUnits' => $existingUnits,
            'existingBrands' => $existingBrands,
            'existingModels' => $existingModels,
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
            'room_number'    => $validated['room_number'], // Optional: Only if you have this column
            'unit_code'      => $validated['unit_code'],
            'peripheral_code'=> $peripheralCode,
            'qr_code_path'   => $peripheralCode, // Store code for QR generation
        ]);

        return redirect()->route('peripherals.index')->with('success', 'Peripheral added successfully.');
    }

    public function edit($id)
    {
        $peripheral = Peripheral::with('room')->findOrFail($id);

        $existingRooms = Room::select('id', 'room_number')->get();
        $existingUnits = SystemUnit::select('id', 'unit_code', 'room_id')->get();

        return Inertia::render('Admin/Peripherals/EditPeripheral', [
            'peripheral'     => $peripheral,
            'existingRooms'  => $existingRooms,
            'existingUnits'  => $existingUnits,
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

    // ✅ New show() method for Admin view
    public function show($id)
    {
        $peripheral = Peripheral::with('room')->findOrFail($id);

        return Inertia::render('Admin/Peripherals/ViewPeripheral', [
            'peripheral' => $peripheral
        ]);
    }

    // Existing Faculty view
    public function showPeripherals(Room $room, Peripheral $peripheral)
    {
        $room->load(['equipments', 'systemUnits', 'peripherals']);

        return Inertia::render('Faculty/FacultyPeripheralsView', [
            'room'        => $room,
            'peripheral'  => $peripheral,
            'user'        => Auth::user(),
            'equipments'  => $room->equipments,
            'systemUnits' => $room->systemUnits,
            'peripherals' => $room->peripherals,
        ]);
    }
}
