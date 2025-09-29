<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EquipmentHistory;

class EquipmentHistorySeeder extends Seeder
{
    public function run(): void
    {
        // --- Option 1: Manually define specific records ---
        // $records = [
        //     [
        //         'equipment_name' => 'Office Table',
        //         'component' => 'Furniture',
        //         'action' => 'Created',
        //         'old_value' => '-',
        //         'new_value' => 'Office Table',
        //         'room_id' => 101,
        //         'user_id' => 1,
        //     ],
        //     [
        //         'equipment_name' => 'Router X100',
        //         'component' => 'Networking',
        //         'action' => 'Deleted',
        //         'old_value' => 'Excellent',
        //         'new_value' => '-',
        //         'room_id' => 102,
        //         'user_id' => 2,
        //     ],
        //     [
        //         'equipment_name' => 'Laser Printer',
        //         'component' => 'Appliances',
        //         'action' => 'Created',
        //         'old_value' => '-',
        //         'new_value' => 'Laser Printer',
        //         'room_id' => 101,
        //         'user_id' => 2,
        //     ],
        //     [
        //         'equipment_name' => 'Fire Extinguisher',
        //         'component' => 'Safety',
        //         'action' => 'Updated',
        //         'old_value' => 'Standard',
        //         'new_value' => 'Expired',
        //         'room_id' => 103,
        //         'user_id' => 1,
        //     ],
        //     // You can add more entries here...
        // ];

        // // Loop through the defined records
        // foreach ($records as $record) {
        //     EquipmentHistory::create(array_merge($record, [
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ]));
        // }

        // --- Option 2: Generate N random records ---
        $components = ['Furniture', 'Appliances', 'Networking', 'Safety'];
        $actions = ['Created', 'Updated', 'Deleted'];
        $rooms = [102, 103, 20, 202, 203, 204];
        $users = [1, 2, 3, 4, 6, 7, 8, 9, 11];

        $numRecords = 50; // Change this to 15, 100, etc.

        for ($i = 1; $i <= $numRecords; $i++) {
            EquipmentHistory::create([
                'equipment_name' => "Equipment $i",
                'component' => $components[array_rand($components)],
                'action' => $actions[array_rand($actions)],
                'old_value' => '-',
                'new_value' => "Equipment $i",
                'room_id' => $rooms[array_rand($rooms)],
                'user_id' => $users[array_rand($users)],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
