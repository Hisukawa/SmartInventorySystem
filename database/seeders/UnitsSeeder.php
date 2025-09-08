<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitsSeeder extends Seeder
{
    public function run(): void
    {
        // Get all rooms (102–204)
        $rooms = DB::table('rooms')
            ->whereIn('room_number', ['102', '103', '201', '202', '203', '204'])
            ->get();

        if ($rooms->isEmpty()) {
            $this->command->error('No matching rooms found in the rooms table!');
            return;
        }

        $conditions = ['Functional', 'Under Maintenance', 'For Repair'];

        $units = [];

        foreach ($rooms as $room) {
            for ($i = 1; $i <= 15; $i++) {
                $unitCode = 'PC-' . str_pad($i, 2, '0', STR_PAD_LEFT);

                $units[] = [
                    'unit_code'    => $unitCode, // ✅ use unit_code, not unit_id
                    'unit_path'    => 'isu-ilagan/ict-department/room-'
                                        . $room->room_number . '/' . strtolower($unitCode),
                    'processor'    => 'Intel Core i5-10400',
                    'ram'          => '8GB DDR4',
                    'storage'      => '512GB SSD',
                    'gpu'          => 'NVIDIA GT 1030',
                    'motherboard'  => 'ASUS Prime B460M-A',
                    'condition'    => $conditions[array_rand($conditions)],
                    'room_id'      => $room->id, // ✅ FK to rooms
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ];
            }
        }

        DB::table('system_units')->insert($units);

        $this->command->info(count($units) . ' units seeded successfully!');
    }
}
