<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productIds = Product::pluck('id')->all();
        $users = User::where('role_id', 2)->get();

        if ($users->isEmpty() || empty($productIds)) {
            return;
        }

        foreach ($users as $targetUser) {
            Comment::factory(4)->create([
                'target_user_id' => $targetUser->id,
                'product_id' => $productIds[array_rand($productIds)],
            ]);
        }
    }
}
