<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Province;
use App\Models\User;
use App\Models\ProductType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Buscamos un usuario aleatorio que sea específicamente de rol 2 (User)
            'user_id' => User::where('role_id', 2)->inRandomOrder()->first()->id 
                        ?? User::first()->id, 

            // Buscamos un tipo de producto aleatorio
            'product_type_id' => ProductType::inRandomOrder()->first()->id ?? 1,
            'province' => Province::inRandomOrder()->first()?->name ?? 'Madrid',
            
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'estimated_value' => $this->faker->randomFloat(2, 5, 1000),
            'status' => $this->faker->boolean(80) ? 'active' : 'inactive',
        ];
    }
}