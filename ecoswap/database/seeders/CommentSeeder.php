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

        $comments = [
            '¡Entrega rápida y producto en excelente estado!',
            'Muy buen trato, volvería a cambiar contigo.',
            'El intercambio se realizó sin problemas.',
            'Producto tal como se describía, 100% recomendado.',
            'Muy buena comunicación y amable en todo momento.',
            'El artículo llegó en perfectas condiciones.',
            'Intercambio sencillo y muy satisfactorio.',
            'Muy contento con el intercambio, gracias.',
            'El producto funcionaba perfectamente al recibirlo.',
            'Buena experiencia general, sin dudas.',
        ];

        $commenterIds = User::where('role_id', 2)->pluck('id')->all();

        foreach ($users as $targetUser) {
            for ($i = 0; $i < 4; $i++) {
                $commenterId = $commenterIds[array_rand($commenterIds)];

                if ($commenterId === $targetUser->id) {
                    $commenterId = $commenterIds[array_rand($commenterIds)];
                }

                Comment::create([
                    'user_id' => $commenterId,
                    'target_user_id' => $targetUser->id,
                    'product_id' => $productIds[array_rand($productIds)],
                    'content' => $comments[array_rand($comments)],
                    'rating' => rand(3, 5),
                    'status' => 'approved',
                ]);
            }
        }
    }
}
