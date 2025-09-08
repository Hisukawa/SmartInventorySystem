<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeripheralsSeeder extends Seeder
{
    public function run(): void
    {
        $units = DB::table('system_units')->get();

        if ($units->isEmpty()) {
            $this->command->error('No system units found! Please seed system_units first.');
            return;
        }

        $peripheralTypes = [
            ['type' => 'Mouse',     'brand' => 'Keytech',  'model' => 'KM-001'],
            ['type' => 'Keyboard',  'brand' => 'A4Tech',   'model' => 'KB-001'],
            ['type' => 'Monitor',   'brand' => 'Dell',     'model' => 'DE-001'],
            ['type' => 'Headset',   'brand' => 'Logitech', 'model' => 'LH-100'],
        ];

        $conditions = ['Working', 'Defective', 'Needs Replacement'];

        $peripherals = [];
        $counter = 1;

        foreach ($units as $unit) {
            foreach ($peripheralTypes as $peripheral) {
                $peripheralCode = 'PRF-' . str_pad($counter, 3, '0', STR_PAD_LEFT);

                $peripherals[] = [
                    'peripheral_code' => $peripheralCode,
                    'type'            => $peripheral['type'],
                    'brand'           => $peripheral['brand'],
                    'model'           => $peripheral['model'],
                    'serial_number'   => strtoupper(substr($peripheral['type'], 0, 1)) . '-' . str_pad($counter, 4, '0', STR_PAD_LEFT),
                    'condition'       => $conditions[array_rand($conditions)],
                    'room_id'         => $unit->room_id,
                    'unit_id'         => $unit->id,
                    'qr_code_path'    => $unit->unit_path . '/' . strtolower($peripheralCode),
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ];

                $counter++;
            }
        }

        DB::table('peripherals')->insert($peripherals);

        $this->command->info(count($peripherals) . ' peripherals seeded successfully!');
    }
}
