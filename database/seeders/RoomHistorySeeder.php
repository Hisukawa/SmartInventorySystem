<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RoomHistory;
use App\Models\User;
use Faker\Factory as Faker;

// ===================================
// THIS SEEDER IS NOT WORKING YET
// THE ISSUE IS BECAUSE OF THE ACTION IN THE DATABASE ITS DATA TYPE IS ENUM('Created', 'Updated', 'Deleted')
// ===================================
class RoomHistorySeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Change this number to insert more or fewer records
        $numberOfRecords = 50;

        $userIds = User::pluck('id')->toArray(); // get all user IDs

        for ($i = 0; $i < $numberOfRecords; $i++) {
            $userId = $faker->randomElement($userIds);
            $user = User::find($userId);

            RoomHistory::create([
                'user_id' => $userId,
                'user_name' => $user->name,
                'role' => $user->role,
                'action' => $faker->randomElement(['Created', 'Updated', 'Deleted']),
                'old_value' => $faker->optional()->word,
                'new_value' => $faker->optional()->word,
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => now(),
            ]);
        }
    }
}
