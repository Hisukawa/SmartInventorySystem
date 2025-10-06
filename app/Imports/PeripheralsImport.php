<?php

namespace App\Imports;

use App\Models\Peripheral;
use App\Models\Room;
use App\Models\SystemUnit;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PeripheralsImport implements ToModel, WithHeadingRow
{
    // public function model(array $row)
    // {
    //     // Normalize headers: lowercase, replace spaces with underscores
    //     $row = collect($row)->mapWithKeys(function ($value, $key) {
    //         $key = strtolower(str_replace(' ', '_', $key));
    //         return [$key => $value];
    //     })->toArray();

    //     $peripheralCode = $row['peripheral_code'] ?? null;
    //     $unitCodeCsv    = $row['unit_code'] ?? null;
    //     $roomNumber     = $row['room_number'] ?? null;
    //     $type           = $row['type'] ?? null;
    //     $brand          = $row['brand'] ?? null;
    //     $model          = $row['model'] ?? null;
    //     $serialNumber   = $row['serial_number'] ?? null;
    //     $condition      = $row['condition'] ?? 'Functional';

    //     if (!$peripheralCode || !$roomNumber) return null;

    //     // Lookup Room
    //     $room = Room::where('room_number', $roomNumber)->first();
    //     if (!$room) return null;
    //     $roomId = $room->id;

    //     // Lookup Unit (optional)
    //     $unitId = null;
    //     $unit   = null;
    //     if ($unitCodeCsv) {
    //         $unit = SystemUnit::whereRaw('UPPER(unit_code) = ?', [strtoupper($unitCodeCsv)])
    //                           ->where('room_id', $roomId)
    //                           ->first();
    //         $unitId = $unit ? $unit->id : null;
    //     }

    //     $unitCode = $unit ? $unit->unit_code : $unitCodeCsv;

    //     // QR path (auto-generate hierarchical format)
    //     $qrCodePath = strtolower(
    //         "isu-ilagan/ict-department/room-{$room->room_number}" .
    //         ($unitCode ? "/{$unitCode}" : "") .
    //         "/{$peripheralCode}"
    //     );

    //     return new Peripheral([
    //         'peripheral_code' => strtoupper($peripheralCode),
    //         'type'            => $type,
    //         'brand'           => $brand,
    //         'model'           => $model,
    //         'serial_number'   => $serialNumber,
    //         'condition'       => $condition,
    //         'room_id'         => $roomId,
    //         'unit_id'         => $unitId,
    //         'qr_code_path'    => $qrCodePath,
    //     ]);
    // }

    // public function model(array $row)
    // {
    //     $peripheralCode = strtoupper($row['peripheral_code'] ?? null);
    //     $unitCodeCsv    = $row['unit_code'] ?? null;
    //     $roomNumber     = $row['room_number'] ?? null;
    //     $type           = $row['type'] ?? null;
    //     $brand          = $row['brand'] ?? null;
    //     $model          = $row['model'] ?? null;
    //     $serialNumber   = $row['serial_number'] ?? null;
    //     $condition      = $row['condition'] ?? 'Functional';

    //     if (!$peripheralCode || !$roomNumber) return null;

    //     // Lookup Room
    //     $room = Room::where('room_number', $roomNumber)->first();
    //     if (!$room) return null;
    //     $roomId = $room->id;

    //     // Lookup Unit (optional)
    //     $unitId = null;
    //     if ($unitCodeCsv) {
    //         $unit = SystemUnit::whereRaw('UPPER(unit_code) = ?', [strtoupper($unitCodeCsv)])
    //                     ->where('room_id', $roomId)
    //                     ->first();
    //         $unitId = $unit ? $unit->id : null;
    //     }

    //     $qrCodePath = strtolower(
    //         "isu-ilagan/ict-department/room-{$room->room_number}" .
    //         ($unitCodeCsv ? "/{$unitCodeCsv}" : "") .
    //         "/{$peripheralCode}"
    //     );

    //     // Check if peripheral already exists
    //     $existing = Peripheral::where('peripheral_code', $peripheralCode)->first();
    //     if ($existing) {
    //         // Already exists → skip import
    //         return null;
    //     }

    //     return new Peripheral([
    //         'peripheral_code' => $peripheralCode,
    //         'type'            => $type,
    //         'brand'           => $brand,
    //         'model'           => $model,
    //         'serial_number'   => $serialNumber,
    //         'condition'       => $condition,
    //         'room_id'         => $roomId,
    //         'unit_id'         => $unitId,
    //         'qr_code_path'    => $qrCodePath,
    //     ]);
    // }

// public function model(array $row)
// {
//     $peripheralCode = strtoupper($row['peripheral_code'] ?? null);
//     $unitCodeCsv    = $row['unit_code'] ?? null;
//     $roomNumber     = $row['room_number'] ?? null;
//     $type           = $row['type'] ?? null;
//     $brand          = $row['brand'] ?? null;
//     $model          = $row['model'] ?? null;
//     $serialNumber   = $row['serial_number'] ?? null;
//     $condition      = $row['condition'] ?? 'Functional';

//     if (!$roomNumber) return null; // room_number is required

//     // Lookup Room
//     $room = Room::where('room_number', $roomNumber)->first();
//     if (!$room) return null;
//     $roomId = $room->id;

//     // Lookup Unit (optional)
//     $unitId = null;
//     if ($unitCodeCsv) {
//         $unit = SystemUnit::whereRaw('UPPER(unit_code) = ?', [strtoupper($unitCodeCsv)])
//                     ->where('room_id', $roomId)
//                     ->first();
//         $unitId = $unit ? $unit->id : null;
//     }

//     // Auto-generate peripheral_code if missing
//     if (!$peripheralCode) {
//         $lastPeripheral = Peripheral::latest('id')->first();
//         $nextId = $lastPeripheral ? $lastPeripheral->id + 1 : 1;
//         $peripheralCode = 'PRF-' . str_pad($nextId, 3, '0', STR_PAD_LEFT); // e.g., P001, P002
//     }

//     $qrCodePath = strtolower(
//         "isu-ilagan/ict-department/room-{$room->room_number}" .
//         ($unitCodeCsv ? "/{$unitCodeCsv}" : "") .
//         "/{$peripheralCode}"
//     );

//     // Check if peripheral already exists
//     $existing = Peripheral::where('peripheral_code', $peripheralCode)->first();
//     if ($existing) {
//         // Already exists → skip import
//         return null;
//     }

//     return new Peripheral([
//         'peripheral_code' => $peripheralCode,
//         'type'            => $type,
//         'brand'           => $brand,
//         'model'           => $model,
//         'serial_number'   => $serialNumber,
//         'condition'       => $condition,
//         'room_id'         => $roomId,
//         'unit_id'         => $unitId,
//         'qr_code_path'    => $qrCodePath,
//     ]);
// }



// public function model(array $row)
// {
//     $peripheralCode = strtoupper($row['peripheral_code'] ?? null);
//     $roomNumber     = $row['room_number'] ?? null;
//     $type           = $row['type'] ?? null;
//     $brand          = $row['brand'] ?? null;
//     $model          = $row['model'] ?? null;
//     $serialNumber   = $row['serial_number'] ?? null;
//     $condition      = $row['condition'] ?? 'Functional';
//     $unitCodeCsv    = $row['unit_code'] ?? null;

//     if (!$peripheralCode || !$roomNumber || !$type) return null;

//     // Lookup Room
//     $room = Room::where('room_number', $roomNumber)->first();
//     if (!$room) return null;
//     $roomId = $room->id;

//     // Lookup Unit (optional)
//     $unitId = null;
//     if ($unitCodeCsv) {
//         $unit = SystemUnit::whereRaw('UPPER(unit_code) = ?', [strtoupper($unitCodeCsv)])
//                     ->where('room_id', $roomId)
//                     ->first();
//         $unitId = $unit ? $unit->id : null;
//     }

//     // Check for existing peripheral (strict duplicate check)
//     $existsQuery = Peripheral::where('peripheral_code', $peripheralCode)
//                     ->where('room_id', $roomId)
//                     ->where('type', $type);

//     if ($unitId) {
//         $existsQuery->where('unit_id', $unitId);
//     } else {
//         $existsQuery->whereNull('unit_id');
//     }

//     if ($existsQuery->exists()) {
//         // Already exists → skip import
//         return null;
//     }

//     // QR code path
//     $qrCodePath = strtolower(
//         "isu-ilagan/ict-department/room-{$room->room_number}" .
//         ($unitCodeCsv ? "/{$unitCodeCsv}" : "") .
//         "/{$peripheralCode}"
//     );

//     return new Peripheral([
//         'peripheral_code' => $peripheralCode,
//         'type'            => $type,
//         'brand'           => $brand,
//         'model'           => $model,
//         'serial_number'   => $serialNumber,
//         'condition'       => $condition,
//         'room_id'         => $roomId,
//         'unit_id'         => $unitId,
//         'qr_code_path'    => $qrCodePath,
//     ]);
// }


    // WORKING FINE USE THIS IF THE OTHERS IS NOT WORKING
// public function model(array $row)
// {
//     $unitCodeCsv  = $row['unit_code'] ?? null;
//     $roomNumber   = $row['room_number'] ?? null;
//     $type         = $row['type'] ?? null;
//     $brand        = $row['brand'] ?? null;
//     $modelName    = $row['model'] ?? null;
//     $serialNumber = $row['serial_number'] ?? null;
//     $condition    = $row['condition'] ?? 'Functional';

//     if (!$unitCodeCsv || !$roomNumber || !$type) return null; // required fields

//     // Lookup Room
//     $room = Room::where('room_number', $roomNumber)->first();
//     if (!$room) return null;
//     $roomId = $room->id;

//     // Lookup Unit (optional)
//     $unit = SystemUnit::whereRaw('UPPER(unit_code) = ?', [strtoupper($unitCodeCsv)])
//                 ->where('room_id', $roomId)
//                 ->first();
//     $unitId = $unit ? $unit->id : null;

//     // Check if a peripheral with same unit, room, and type exists
//     $existing = Peripheral::where('room_id', $roomId)
//                 ->where('unit_id', $unitId)
//                 ->whereRaw('UPPER(type) = ?', [strtoupper($type)])
//                 ->first();
//     if ($existing) {
//         // Already exists → skip import
//         return null;
//     }

//     // Auto-generate peripheral_code
//     $lastPeripheral = Peripheral::latest('id')->first();
//     $nextId = $lastPeripheral ? $lastPeripheral->id + 1 : 1;
//     $peripheralCode = 'PRF-' . str_pad($nextId, 3, '0', STR_PAD_LEFT);

//     // Generate QR code path
//     $qrCodePath = strtolower(
//         "isu-ilagan/ict-department/room-{$room->room_number}" .
//         ($unitCodeCsv ? "/{$unitCodeCsv}" : "") .
//         "/{$peripheralCode}"
//     );

//     return new Peripheral([
//         'peripheral_code' => $peripheralCode,
//         'type'            => $type,
//         'brand'           => $brand,
//         'model'           => $modelName,
//         'serial_number'   => $serialNumber,
//         'condition'       => $condition,
//         'room_id'         => $roomId,
//         'unit_id'         => $unitId,
//         'qr_code_path'    => $qrCodePath,
//     ]);
// }




public function model(array $row)
{
    $unitCodeCsv  = $row['unit_code'] ?? null;
    $roomNumber   = $row['room_number'] ?? null;
    $type         = $row['type'] ?? null;
    $brand        = $row['brand'] ?? null;
    $modelName    = $row['model'] ?? null;
    $serialNumber = $row['serial_number'] ?? null;
    $condition    = $row['condition'] ?? 'Functional';

    if (!$unitCodeCsv || !$roomNumber || !$type) return null; // required fields

    // Lookup Room
    $room = Room::where('room_number', $roomNumber)->first();
    if (!$room) return null;
    $roomId = $room->id;

    // Lookup Unit
    $unit = SystemUnit::whereRaw('UPPER(unit_code) = ?', [strtoupper($unitCodeCsv)])
                ->where('room_id', $roomId)
                ->first();

    if (!$unit) {
        // Unit code does not exist → throw exception for SweetAlert
        throw new \Exception("Unit code '{$unitCodeCsv}' in Room {$roomNumber} does not exist yet.");
    }

    $unitId = $unit->id;

    // Check if a peripheral with same unit, room, and type exists
    $existing = Peripheral::where('room_id', $roomId)
                ->where('unit_id', $unitId)
                ->whereRaw('UPPER(type) = ?', [strtoupper($type)])
                ->first();
    if ($existing) {
        // Already exists → skip import
        return null;
    }

    // Auto-generate peripheral_code
    $lastPeripheral = Peripheral::latest('id')->first();
    $nextId = $lastPeripheral ? $lastPeripheral->id + 1 : 1;
    $peripheralCode = 'PRF-' . str_pad($nextId, 3, '0', STR_PAD_LEFT);

    // Generate QR code path
    $qrCodePath = strtolower(
        "isu-ilagan/ict-department/room-{$room->room_number}" .
        "/{$unitCodeCsv}" .
        "/{$peripheralCode}"
    );

    return new Peripheral([
        'peripheral_code' => $peripheralCode,
        'type'            => $type,
        'brand'           => $brand,
        'model'           => $modelName,
        'serial_number'   => $serialNumber,
        'condition'       => $condition,
        'room_id'         => $roomId,
        'unit_id'         => $unitId,
        'qr_code_path'    => $qrCodePath,
    ]);
}


}
