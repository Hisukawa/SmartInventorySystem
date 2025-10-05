<?php

namespace App\Imports;

use App\Models\SystemUnit;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use App\Models\Room;
use App\Models\User;

class SystemUnitImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        // Map friendly CSV column names to DB fields
        $unitCode        = $row['unit_number'] ?? null;
        $roomNumber      = $row['room_number'] ?? null;
        $serialNumber    = $row['serial_number'] ?? null;
        $processor       = $row['processor'] ?? null;
        $ram             = $row['ram'] ?? null;
        $storage         = $row['storage'] ?? null;
        $gpu             = $row['gpu'] ?? null;
        $motherboard     = $row['motherboard'] ?? null;
        $condition       = $row['condition'] ?? 'Working';
        $mrName          = $row['mr_name'] ?? null;
        $conditionDetail = $row['condition_details'] ?? null;

        // Skip row if required data missing
        if (!$unitCode || !$roomNumber) {
            return null;
        }

        // Lookup Room ID by Room Number
        $room = Room::where('room_number', $roomNumber)->first();
        if (!$room) return null;
        $roomId = $room->id;

        // Lookup MR ID by faculty name (optional)
        $mrId = null;
        if ($mrName && strtolower($mrName) !== 'n/a') {
            $mr = User::where('name', $mrName)
                      ->where('role', 'faculty')
                      ->first();
            $mrId = $mr ? $mr->id : null;
        }

        // Normalize Unit Code (uppercase, prefix PC- if missing)
        $unitCode = strtoupper($unitCode);
        if (!str_starts_with($unitCode, 'PC-')) {
            $unitCode = 'PC-' . $unitCode;
        }

        // ✅ Restrict duplicates within the same room
        $exists = SystemUnit::where('unit_code', $unitCode)
            ->where('room_id', $roomId)
            ->exists();

        if ($exists) {
            return null; // ❌ Skip duplicate in the same room
        }

        // Generate unique unit_path (lowercase for URLs)
        $unitPath = strtolower("isu-ilagan/ict-department/room-{$room->room_number}/{$unitCode}");

        return new SystemUnit([
            'unit_code'         => $unitCode,
            'unit_path'         => $unitPath,
            'room_id'           => $roomId,
            'serial_number'     => $serialNumber,
            'processor'         => $processor,
            'ram'               => $ram,
            'storage'           => $storage,
            'gpu'               => $gpu,
            'motherboard'       => $motherboard,
            'condition'         => $condition,
            'mr_id'             => $mrId,
            'condition_details' => $conditionDetail,
        ]);
    }
}
