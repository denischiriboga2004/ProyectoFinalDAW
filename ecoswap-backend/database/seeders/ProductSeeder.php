<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::factory(12)->create()->each(function ($product) {
            \App\Models\ProductImage::create([
                'product_id' => $product->id,
                'url' => 'https://picsum.photos/600/400?random=' . $product->id,
                'is_main' => true, // <--- CAMBIA 'is_primary' POR 'is_main'
            ]);
        });
    }
}