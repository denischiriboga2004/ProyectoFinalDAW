<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['Electrónica', 'Hogar', 'Ropa', 'Deportes'];
        foreach ($types as $type) {
            \App\Models\ProductType::create(['name' => $type]);
        }
    }
}
