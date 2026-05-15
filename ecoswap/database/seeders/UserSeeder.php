<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin EcoSwap',
            'email' => 'admin@ecoswap.com',
            'password' => Hash::make('123456789'),
            'role_id' => 1, // ID del Admin
            'email_verified_at' => now(),
        ]);
            User::create([
            'name' => 'Prueba',
            'email' => 'prueba@gmail.com',
            'password' => Hash::make('123456789'),
            'role_id' => 2, // ID del Admin
            'email_verified_at' => now(),
        ]);

        User::factory(20)->create();
    }
}