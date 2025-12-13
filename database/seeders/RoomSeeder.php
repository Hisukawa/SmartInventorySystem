<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            [
                'room_number' => '102',
                'room_path'   => 'isu-ilagan/ict-department/room-102',
            ],
            [
                'room_number' => '103',
                'room_path'   => 'isu-ilagan/ict-department/room-103',
            ],
            [
                'room_number' => '201',
                'room_path'   => 'isu-ilagan/ict-department/room-201',
            ],
            [
                'room_number' => '202',
                'room_path'   => 'isu-ilagan/ict-department/room-202',
            ],
            [
                'room_number' => '203',
                'room_path'   => 'isu-ilagan/ict-department/room-203',
            ],
            [
                'room_number' => '204',
                'room_path'   => 'isu-ilagan/ict-department/room-204',
            ],
        ];

        foreach ($rooms as $roomData) {
            Room::create($roomData); // ✅ Eloquent create triggers the observer
        }

        $this->command->info(count($rooms) . ' rooms seeded successfully with history!');
    }
}
