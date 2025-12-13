<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Equipment;
use App\Models\EquipmentHistory;
use App\Models\User;

class RoomEquipmentsSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/equipments.csv');

        if (!file_exists($path)) {
            $this->command->error('CSV file not found!');
            return;
        }

        $file = fopen($path, 'r');
        $header = fgetcsv($file);

        if (!$header) {
            $this->command->error('CSV file is empty or invalid!');
            return;
        }

        // Default admin user for history
        $defaultUserId = User::where('role', 'admin')->first()->id ?? 1;

        while (($row = fgetcsv($file)) !== false) {
            $data = array_combine($header, $row);

            // Create or get equipment
            $equipment = Equipment::firstOrCreate(
                ['equipment_code' => $data['equipment_code']],
                [
                    'equipment_name' => $data['equipment_name'],
                    'type'           => $data['type'],
                    'brand'          => $data['brand'],
                    'condition'      => $data['condition'],
                    'room_id'        => $data['room_id'],
                    'qr_code'        => $data['qr_code'],
                    'created_at'     => $data['created_at'] ?? now(),
                    'updated_at'     => $data['updated_at'] ?? now(),
                ]
            );

            // Create initial history entry
            EquipmentHistory::create([
                'user_id'        => $defaultUserId,
                'equipment_name' => $equipment['equipment_name'],
                'component'      => $equipment['type'], // maps type -> component
                'action'         => 'Created',
                'old_value'      => null,
                'new_value'      => $equipment['equipment_name'],
                'room_id'        => $equipment['room_id'],
                'created_at'     => now(),
                'updated_at'     => now(),
            ]);
        }

        fclose($file);

        $this->command->info('Equipments and their histories seeded successfully!');
    }
}
