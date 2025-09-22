<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserHistory;
use Faker\Factory as Faker;

class UserHistorySeeder extends Seeder
{
    /**
     * Number of sample entries to generate
     */
    protected $entries = 100; // <-- Change this number to generate more/less entries

    public function run(): void
    {
        $faker = Faker::create();

        $actions = ['Created User', 'Updated User', 'Deleted User', 'Password Reset'];
        $components = ['Role', 'Email', 'Name', 'Password', 'Department'];
        $roles = ['Admin', 'Faculty', 'Technician', 'Guest'];

        for ($i = 0; $i < $this->entries; $i++) {
            $action = $faker->randomElement($actions);
            $component = $faker->randomElement($components);
            $userName = $faker->firstName . ' ' . $faker->lastName;

            $oldValue = $component === 'Password' ? 'Password Changed' : $faker->word;
            $newValue = $component === 'Password' ? 'Password Changed' : $faker->word;

            // For Created User action, old_value is always "-"
            if ($action === 'Created User') {
                $oldValue = '-';
            }

            UserHistory::create([
                'user_name' => 'Admin ' . $faker->firstName,
                'action' => $action,
                'component' => $component,
                'old_value' => $oldValue,
                'new_value' => $newValue,
                'created_at' => $faker->dateTimeThisYear(),
            ]);
        }
    }
}
