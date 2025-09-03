<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomEquipmentsSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = DB::table('rooms')->get();

        if ($rooms->isEmpty()) {
            $this->command->error('No rooms found! Please seed rooms first.');
            return;
        }

        $equipmentsList = [
            ['name' => 'Chair',        'type' => 'Hardware', 'brand' => 'Uratex'],
            ['name' => 'Wooden Table', 'type' => 'Hardware', 'brand' => 'Local'],
            ['name' => 'Aircon',       'type' => 'Appliance','brand' => 'Carrier'],
        ];

        $conditions = ['Functional', 'Defective', 'Needs Maintenance'];
        $equipments = [];
        $counter = 1;

        foreach ($rooms as $room) {
            foreach ($equipmentsList as $equipment) {
                $equipmentCode = 'EQP-' . str_pad($counter, 2, '0', STR_PAD_LEFT);

                $equipments[] = [
                    'equipment_code' => $equipmentCode,
                    'equipment_name' => $equipment['name'],
                    'type'           => $equipment['type'],
                    'brand'          => $equipment['brand'],
                    'condition'      => $conditions[array_rand($conditions)],
                    'created_at'     => now(),
                    'updated_at'     => now(),
                    'room_id'        => $room->id,
                    'qr_code'        => 'isu-ilagan/ict-department/room-' . $room->room_number . '/' . strtolower($equipmentCode),
                ];

                $counter++;
            }
        }

        DB::table('equipments')->insert($equipments);

        $this->command->info(count($equipments) . ' room equipments seeded successfully!');
    }
}
