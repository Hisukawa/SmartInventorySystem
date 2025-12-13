<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Peripheral;
use App\Models\PeripheralHistory;
use App\Models\User;

class PeripheralsSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/peripherals.csv');

        if (!file_exists($path)) {
            $this->command->error('CSV file not found!');
            return;
        }

        $file = fopen($path, 'r');
        $header = fgetcsv($file);

        // Use a default user for history (first admin or fallback 1)
        $defaultUserId = User::where('role', 'admin')->first()->id ?? 1;

        while (($row = fgetcsv($file)) !== false) {
            $data = array_combine($header, $row);

            $peripheral = Peripheral::firstOrCreate(
                ['qr_code_path' => $data['qr_code_path']],
                [
                    'peripheral_code'   => $data['peripheral_code'],
                    'type'              => $data['type'],
                    'brand'             => $data['brand'],
                    'model'             => $data['model'],
                    'serial_number'     => $data['serial_number'],
                    'condition'         => $data['condition'],
                    'condition_details' => $data['condition_details'],
                    'room_id'           => $data['room_id'],
                    'unit_id'           => $data['unit_id'],
                    'created_at'        => $data['created_at'] ?? now(),
                    'updated_at'        => $data['updated_at'] ?? now(),
                ]
            );

            // Create history for seeding
            PeripheralHistory::create([
                'user_id'        => $defaultUserId,
                'peripheral_id'  => $peripheral->id,
                'peripheral_code'=> $peripheral->peripheral_code,
                'unit_id'        => $peripheral->unit_id,
                'room_id'        => $peripheral->room_id,
                'action'         => 'Created',
                'component'      => $peripheral->type,
                'old_value'      => null,
                'new_value'      => $peripheral->type,
                'created_at'     => $peripheral->created_at,
                'updated_at'     => $peripheral->updated_at,
            ]);
        }

        fclose($file);

        $this->command->info('Peripherals and their histories seeded successfully!');
    }
}
