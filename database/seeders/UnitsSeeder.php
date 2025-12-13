<?php

namespace Database\Seeders;

use App\Models\SystemUnit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UnitsSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/system_units.csv');

        if (!file_exists($path)) {
            $this->command->error('CSV file not found!');
            return;
        }

        $file = fopen($path, 'r');
        $header = fgetcsv($file);

        while (($row = fgetcsv($file)) !== false) {
            $data = array_combine($header, $row);

            SystemUnit::firstOrCreate(
                ['unit_path' => $data['unit_path']],
                [
                    'unit_code' => $data['unit_code'],
                    'room_id' => $data['room_id'],
                    'serial_number' => $data['serial_number'],
                    'operating_system' => $data['operating_system'],
                    'processor' => $data['processor'],
                    'ram' => $data['ram'],
                    'storage' => $data['storage'],
                    'gpu' => $data['gpu'],
                    'motherboard' => $data['motherboard'],
                    'condition' => $data['condition'],
                    'mr_id' => $data['mr_id'],
                    'condition_details' => $data['condition_details'],
                ]
            );
        }

        fclose($file);
    }


    // public function run(): void
    // {
    //     // Get all rooms (102–204)
    //     $rooms = DB::table('rooms')
    //         ->whereIn('room_number', ['102', '201', '202', '203', '204'])
    //         ->get();

    //     if ($rooms->isEmpty()) {
    //         $this->command->error('No matching rooms found in the rooms table!');
    //         return;
    //     }

    //     $conditions = ['Functional', 'Under Maintenance', 'Defective', 'Needs Upgrade', 'For Disposal'];

    //     $units = [];

    //     foreach ($rooms as $room) {
    //         for ($i = 1; $i <= 100; $i++) {
    //             $unitCode = 'PC-' . str_pad($i, 2, '0', STR_PAD_LEFT);
    //             $condition = $conditions[array_rand($conditions)];

    //             // Optional details for non-functional units
    //             $conditionDetails = in_array($condition, ['Defective', 'Needs Upgrade', 'For Disposal'])
    //                 ? 'Details about ' . strtolower($condition)
    //                 : null;

    //             $units[] = [
    //                 'unit_code'         => $unitCode,
    //                 'unit_path'         => 'isu-ilagan/ict-department/room-'
    //                                         . $room->room_number . '/' . strtolower($unitCode),
    //                 'room_id'           => $room->id,
    //                 'serial_number'     => strtoupper(Str::random(10)), // Random 10-character serial
    //                 'processor'         => 'Intel Core i5-10400',
    //                 'ram'               => '8GB DDR4',
    //                 'storage'           => '512GB SSD',
    //                 'gpu'               => 'NVIDIA GT 1030',
    //                 'motherboard'       => 'ASUS Prime B460M-A',
    //                 'condition'         => $condition,
    //                 'mr_id'             => null, // Can be assigned later
    //                 'condition_details' => $conditionDetails,
    //                 'created_at'        => now(),
    //                 'updated_at'        => now(),
    //             ];
    //         }
    //     }

    //     DB::table('system_units')->insert($units);

    //     $this->command->info(count($units) . ' units seeded successfully!');
    // }
}
