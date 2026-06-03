<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductType;
use App\Models\User;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productTypes = ProductType::all();
        $swapOptions = [
            'Una tablet en buen estado',
            'Un móvil antiguo pero funcional',
            'Una consola portátil',
            'Un altavoz Bluetooth',
            'Un saco de dormir',
            'Un juego de mesa completo',
            'Una mochila resistente',
            'Un par de auriculares inalámbricos',
            'Un set de herramientas básico',
            'Una lámpara de escritorio LED',
        ];

        $users = User::where('role_id', 2)->get();

        foreach ($users as $user) {
            $province = $user->address?->province ?? 'Madrid';

            for ($i = 0; $i < 2; $i++) {
                $product = Product::create([
                    'user_id' => $user->id,
                    'product_type_id' => $productTypes->random()->id ?? 1,
                    'province' => $province,
                    'name' => "Producto de {$user->name} #" . ($i + 1),
                    'description' => "Artículo en buen estado disponible para intercambio.",
                    'estimated_value' => rand(10, 150),
                    'swap_for' => $swapOptions[array_rand($swapOptions)],
                    'status' => 'active',
                ]);

                ProductImage::create([
                    'product_id' => $product->id,
                    'url' => 'https://picsum.photos/600/400?random=' . ($product->id + $i),
                    'is_main' => true,
                ]);
            }
        }
    }
}