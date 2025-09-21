<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SystemUnitHistory;
use App\Models\User;
use App\Models\SystemUnit;

class SystemUnitHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 🔧 change this value anytime
        $count = 100;

        $users = User::all();
        $systemUnits = SystemUnit::all();

        for ($i = 0; $i < $count; $i++) {
            $user = $users->random();
            $unit = $systemUnits->isNotEmpty() ? $systemUnits->random() : null;

            $action = fake()->randomElement(['Create', 'Update', 'Delete', 'Maintenance']);
            $component = fake()->randomElement(['Entire Unit', 'RAM', 'GPU', 'Storage', 'CPU']);

            SystemUnitHistory::create([
                'system_unit_id' => $action === 'Delete' ? null : optional($unit)->id,
                'user_id'        => $user->id,
                'user_name'      => $user->name,
                'action'         => $action,
                'component'      => $component,
                'old_value'      => $action === 'Create' ? null : fake()->word(),
                'new_value'      => $action === 'Delete' ? null : fake()->word(),
            ]);
        }
    }
}
