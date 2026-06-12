<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        $author = User::inRandomOrder()->first() ?? User::factory()->create();
        $target = User::where('id', '!=', $author->id)->inRandomOrder()->first() ?? $author;

        return [
            'user_id' => $author->id,
            'target_user_id' => $target->id,
            'product_id' => null,
            'content' => $this->faker->paragraph(),
            'rating' => $this->faker->optional()->numberBetween(1, 5),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
