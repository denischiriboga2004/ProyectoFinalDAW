<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTypeSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Tecnología y Electrónica'],
            ['name' => 'Ropa y Accesorios'],
            ['name' => 'Hogar y Jardín'],
            ['name' => 'Deporte y Ocio'],
            ['name' => 'Consolas y Videojuegos'],
            ['name' => 'Libros, Música y Películas'],
            ['name' => 'Motor y Accesorios'],
            ['name' => 'Niños y Bebés'],
            ['name' => 'Otros / No clasificado'], // Por si acaso
        ];

        foreach ($categories as $category) {
            DB::table('product_types')->updateOrInsert(
                ['name' => $category['name']],
                ['created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}