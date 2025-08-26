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
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'email_verified_at' => now(), // ✅ Verified
            'remember_token' => Str::random(10), // ✅ Random token
        ]);

        // Faculty user
        User::create([
            'name' => 'Faculty User',
            'email' => 'faculty@example.com',
            'password' => Hash::make('password123'),
            'role' => 'faculty',
        ]);

        // Technician user
        User::create([
            'name' => 'Technician User',
            'email' => 'technician@example.com',
            'password' => Hash::make('password123'),
            'role' => 'technician',
        ]);

        // Guest user
        User::create([
            'name' => 'Guest User',
            'email' => 'guest@example.com',
            'password' => Hash::make('password123'),
            'role' => 'guest',
        ]);
    }
}
