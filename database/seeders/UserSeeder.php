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
        // Admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'administrator@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@administrator'),
            'role' => 'admin',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Orfel L. Bejarin',
            'email' => 'orfel.l.bejarin@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@orfel'),
            'role' => 'admin',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        // Faculty users
        User::create([
            'name' => 'Zach Chamberlaine M. Corpuz',
            'email' => 'zachchamberlaine.m.corpuz@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@zachchamberlaine'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Roman Alex F. Lustro',
            'email' => 'romanalex.f.lustro@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@romanalex'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Maribel S. Abalos',
            'email' => 'maribel.s.abalos@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@maribel'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Mark Gerald O. De Leon',
            'email' => 'markgerald.o.deleon@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@markgerald'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Angelo R. Gamara',
            'email' => 'angelo.r.gamara@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@angelo'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Von Ryan P. Marcelo',
            'email' => 'vonryan.p.marcelo@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@vonryan'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Fitzerland D. Lim',
            'email' => 'fitzgerald.d.lim@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@fitzgerald'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Jaydwin T. Labiano',
            'email' => 'jaydwin.t.labiano@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@jaydwin'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Mark Gil T. Gangan',
            'email' => 'markgil.t.gangan@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@markgil'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Joey G. Natividad',
            'email' => 'joey.g.natividad@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@joey'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Jhoan V. Paguirigan',
            'email' => 'jhoan.v.paguirigan@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@jhoan'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Eddison B. Tuliao',
            'email' => 'eddison.b.tuliao@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@eddison'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Maria Theresa P. Nuez',
            'email' => 'mariatheresa.p.nuez@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@mariatheresa'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Rachel A. Cabajar',
            'email' => 'rachel.a.cabajar@isu.edu.ph',
            'password' => Hash::make('isu.edu.ph@rachel'),
            'role' => 'faculty',
            'photo' => 'photos/default-icon.png',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);





        // ==============================================
        //              DON't DELETE THIS
        // ==============================================
        // $faker = Faker::create();

        // // Define how many users you want per role
        // $roles = [
        //     'admin' => 2,
        //     'faculty' => 10,
        //     'technician' => 6,
        //     'guest' => 16,
        // ];

        // foreach ($roles as $role => $count) {
        //     for ($i = 0; $i < $count; $i++) {
        //         $name = $faker->name();
        //         $email = $faker->unique()->safeEmail();
        //         $password = '123123123'; // default password for all generated users

        //         User::create([
        //             'name' => $name,
        //             'email' => $email,
        //             'password' => Hash::make($password),
        //             'role' => $role,
        //             'email_verified_at' => now(),
        //             'remember_token' => Str::random(10),
        //         ]);
        //     }
        // }
    }
}
