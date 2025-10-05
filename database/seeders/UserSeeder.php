<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'email_verified_at' => now(), // ✅ Verified
            'remember_token' => Str::random(10), // ✅ Random token
        ]);

        // Faculty user
        $facultyNames = [
            ['name' => 'Maria Santos', 'email' => 'maria.santos@gmail.com'],
            ['name' => 'Jose Delgado', 'email' => 'jose.delgado@gmail.com'],
            ['name' => 'Ana Cruz', 'email' => 'ana.cruz@gmail.com'],
            ['name' => 'Carlos Reyes', 'email' => 'carlos.reyes@gmail.com'],
            ['name' => 'Elena Navarro', 'email' => 'elena.navarro@gmail.com'],
        ];

        foreach ($facultyNames as $faculty) {
            User::create([
                'name' => $faculty['name'],
                'email' => $faculty['email'],
                'password' => Hash::make('faculty123'),
                'role' => 'faculty',
            ]);
        }

        // Technician user
        User::create([
            'name' => 'Technician User',
            'email' => 'technician@gmail.com',
            'password' => Hash::make('technician123'),
            'role' => 'technician',
        ]);

        // Guest user
        User::create([
            'name' => 'Guest User',
            'email' => 'guest@gmail.com',
            'password' => Hash::make('guest123'),
            'role' => 'guest',
        ]);
    }
}
