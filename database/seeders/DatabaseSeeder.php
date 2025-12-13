<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Call all other seeders
        $this->call([
            UserSeeder::class,
            RoomSeeder::class,
            UnitsSeeder::class,
            PeripheralsSeeder::class,
            RoomEquipmentsSeeder::class,
            // UserHistorySeeder::class,
            // RoomHistorySeeder::class,
            // SystemUnitHistorySeeder::class,
            // EquipmentHistorySeeder::class,
        ]);
    }
}
