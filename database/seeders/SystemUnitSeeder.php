<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SystemUnit;

class SystemUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SystemUnit::create([
            'unit_id' => 'isu-ilagan/ict-department/room-101/pc-01',
            'unit_number' => 'PC-01',
            'processor' => 'Intel i5-10400',
            'ram' => '8GB DDR4',
            'storage' => '256GB SSD',
            'gpu' => 'Intel UHD 630',
            'motherboard' => 'ASUS H510M',
            'condition' => 'Functional',
        ]);
    }
}
