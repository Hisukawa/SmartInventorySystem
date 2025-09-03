<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            [
                'room_number'     => '102',
                'room_path'       => 'isu-ilagan/ict-department/room-102',
                'created_at'      => '2025-09-03 04:33:31',
                'updated_at'      => '2025-09-03 04:33:31',
                'status'          => 'inactive',
                'last_scanned_by' => NULL,
                'last_scanned_at' => NULL,
                'is_active'       => 0,
            ],
            [
                'room_number'     => '103',
                'room_path'       => 'isu-ilagan/ict-department/room-103',
                'created_at'      => now(),
                'updated_at'      => now(),
                'status'          => 'inactive',
                'last_scanned_by' => NULL,
                'last_scanned_at' => NULL,
                'is_active'       => 0,
            ],
            [
                'room_number'     => '201',
                'room_path'       => 'isu-ilagan/ict-department/room-201',
                'created_at'      => now(),
                'updated_at'      => now(),
                'status'          => 'inactive',
                'last_scanned_by' => NULL,
                'last_scanned_at' => NULL,
                'is_active'       => 0,
            ],
            [
                'room_number'     => '202',
                'room_path'       => 'isu-ilagan/ict-department/room-202',
                'created_at'      => now(),
                'updated_at'      => now(),
                'status'          => 'inactive',
                'last_scanned_by' => NULL,
                'last_scanned_at' => NULL,
                'is_active'       => 0,
            ],
            [
                'room_number'     => '203',
                'room_path'       => 'isu-ilagan/ict-department/room-203',
                'created_at'      => now(),
                'updated_at'      => now(),
                'status'          => 'inactive',
                'last_scanned_by' => NULL,
                'last_scanned_at' => NULL,
                'is_active'       => 0,
            ],
            [
                'room_number'     => '204',
                'room_path'       => 'isu-ilagan/ict-department/room-204',
                'created_at'      => now(),
                'updated_at'      => now(),
                'status'          => 'inactive',
                'last_scanned_by' => NULL,
                'last_scanned_at' => NULL,
                'is_active'       => 0,
            ],
        ];

        DB::table('rooms')->insert($rooms);

        $this->command->info(count($rooms) . ' rooms seeded successfully!');
    }
}
