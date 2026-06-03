<?php

namespace Database\Seeders;

use App\Models\Province;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin EcoSwap',
            'email' => 'admin@ecoswap.com',
            'password' => Hash::make('123456789'),
            'role_id' => 1,
            'email_verified_at' => now(),
            'status' => 'active',
        ]);

        $admin->address()->create([
            'province' => 'Madrid',
        ]);

        $trial = User::create([
            'name' => 'Prueba',
            'email' => 'prueba@gmail.com',
            'password' => Hash::make('123456789'),
            'role_id' => 2,
            'email_verified_at' => now(),
            'status' => 'inactive',
        ]);

        $trial->address()->create([
            'province' => 'Barcelona',
        ]);

        $provinceNames = Province::pluck('name')->toArray();

        $users = [
            ['name' => 'Ana Pérez', 'email' => 'ana.perez@example.com'],
            ['name' => 'Carlos Ruiz', 'email' => 'carlos.ruiz@example.com'],
            ['name' => 'Beatriz Gómez', 'email' => 'beatriz.gomez@example.com'],
            ['name' => 'Daniel Torres', 'email' => 'daniel.torres@example.com'],
            ['name' => 'Elena Sánchez', 'email' => 'elena.sanchez@example.com'],
            ['name' => 'Fernando López', 'email' => 'fernando.lopez@example.com'],
            ['name' => 'Gabriela Díaz', 'email' => 'gabriela.diaz@example.com'],
            ['name' => 'Hugo Martín', 'email' => 'hugo.martin@example.com'],
            ['name' => 'Isabel Navarro', 'email' => 'isabel.navarro@example.com'],
            ['name' => 'Javier Molina', 'email' => 'javier.molina@example.com'],
        ];

        foreach ($users as $index => $userData) {
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make('password123'),
                'role_id' => 2,
                'email_verified_at' => now(),
                'status' => 'active',
            ]);

            $user->address()->create([
                'province' => $provinceNames[$index % count($provinceNames)] ?? 'Madrid',
            ]);
        }
    }
}