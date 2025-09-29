<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomEquipmentsSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = DB::table('rooms')
                ->whereIn('room_number', ['102', '201', '202', '203', '204'])
                ->get();


        if ($rooms->isEmpty()) {
            $this->command->error('No rooms found! Please seed rooms first.');
            return;
        }

        $equipmentsList = [
            // Furniture
            ['name' => 'Chair',        'type' => 'Furniture',  'brand' => 'Uratex'],
            ['name' => 'Wooden Table', 'type' => 'Furniture',  'brand' => 'Local'],
            ['name' => 'Whiteboard',   'type' => 'Furniture',  'brand' => 'Universal'],

            // Appliances
            ['name' => 'Aircon',       'type' => 'Appliance',  'brand' => 'Carrier'],
            ['name' => 'Projector',    'type' => 'Appliance',  'brand' => 'Epson'],
            ['name' => 'Ceiling Fan',  'type' => 'Appliance',  'brand' => 'Panasonic'],
            ['name' => 'Electric Fan', 'type' => 'Appliance',  'brand' => 'Asahi'],
            ['name' => 'Smart TV',     'type' => 'Appliance',  'brand' => 'Samsung'],
            ['name' => 'Speaker System','type' => 'Appliance', 'brand' => 'Sony'],

            // Networking
            ['name' => 'Router',       'type' => 'Networking', 'brand' => 'TP-Link'],
            ['name' => 'Switch Hub',   'type' => 'Networking', 'brand' => 'Cisco'],
            ['name' => 'Access Point', 'type' => 'Networking', 'brand' => 'Ubiquiti'],

            // Safety
            ['name' => 'Fire Extinguisher','type' => 'Safety', 'brand' => 'SafeGuard'],
            ['name' => 'Emergency Light',  'type' => 'Safety', 'brand' => 'Omni'],
            ['name' => 'First Aid Kit',    'type' => 'Safety', 'brand' => 'Red Cross'],
        ];

        $conditions = [
            'Functional',
            'Defective',
            'Intermittent Issue',
            'Needs Cleaning',
            'For Replacement',
            'For Disposal',
            'For Condemn',
        ];

        $equipments = [];
        $counter = 1;

        foreach ($rooms as $room) {
            foreach ($equipmentsList as $equipment) {
                $quantity = rand(1, 30); // 1–30 items per equipment type

                for ($i = 0; $i < $quantity; $i++) {
                    $equipmentCode = 'EQP-' . str_pad($counter, 3, '0', STR_PAD_LEFT);

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
        }

        DB::table('equipments')->insert($equipments);

        $this->command->info(count($equipments) . ' room equipments seeded successfully!');
    }
}
