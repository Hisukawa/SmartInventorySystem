<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Define how many users you want per role
        $roles = [
            'admin' => 2,
            'faculty' => 10,
            'technician' => 6,
            'guest' => 16,
        ];

        foreach ($roles as $role => $count) {
            for ($i = 0; $i < $count; $i++) {
                $name = $faker->name();
                $email = $faker->unique()->safeEmail();
                $password = '123123123'; // default password for all generated users

                User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => Hash::make($password),
                    'role' => $role,
                    'email_verified_at' => now(),
                    'remember_token' => Str::random(10),
                ]);
            }
        }
    }
}
