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
            'role_id' => 1,
            'postal_code' => '28001',
            'email_verified_at' => now(),
            'status' => 'active',
        ]);

        User::create([
            'name' => 'Prueba',
            'email' => 'prueba@gmail.com',
            'password' => Hash::make('123456789'),
            'role_id' => 2,
            'postal_code' => '08001',
            'email_verified_at' => now(),
            'status' => 'inactive',
        ]);

        // Si usas la factoría, le pasamos un código postal por defecto para los 20 usuarios aleatorios
        User::factory(20)->create([
            'postal_code' => '41001'
        ]);
    }
}