<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ChatController extends Controller
{
    public function show(Product $product)
    {
        $authId = auth()->id();

        if ($product->user_id === $authId) {
            return redirect('/')->with('error', 'No puedes abrir un chat en tu propio producto.');
        }

        $product->load([
            'user',
            'productImages',
            'comments',
        ]);

        $product->product_images = $product->productImages->map(function ($img) {
            $img->url = Storage::url($img->image_path); 
            return $img;
        });

        $messages = Message::where('product_id', $product->id)
            ->where(function ($q) use ($authId, $product) {
                $q->where(function ($sub) use ($authId, $product) {
                    $sub->where('sender_id', $authId)
                        ->where('receiver_id', $product->user_id);
                })->orWhere(function ($sub) use ($authId, $product) {
                    $sub->where('sender_id', $product->user_id)
                        ->where('receiver_id', $authId);
                });
            })
            ->orderBy('created_at', 'asc')
            ->get();

        $conversations = Message::where(function ($q) use ($authId) {
                $q->where('sender_id', $authId)
                  ->orWhere('receiver_id', $authId);
            })
            ->with(['product.productImages', 'product.user']) 
            ->latest() 
            ->get()
            ->groupBy('product_id') 
            ->map(function ($group) {
                $lastMessage = $group->first(); 
                return [
                    'id' => $lastMessage->id,
                    'last_message' => $lastMessage->content,
                    'updated_at' => $lastMessage->created_at,
                    'product' => [
                        'id' => $lastMessage->product->id,
                        'name' => $lastMessage->product->name,
                        'product_images' => $lastMessage->product->productImages->map(function($img) {
                            return ['url' => Storage::url($img->image_path)]; 
                        }),
                    ]
                ];
            })
            ->values(); 

        return Inertia::render('Chat/Show', [
            'product' => $product,
            'messages' => $messages,
            'conversations' => $conversations, 
        ]);
    }

    public function send(Request $request, Product $product)
    {
        if ($product->user_id === auth()->id()) {
            return abort(403, 'Acción no autorizada.');
        }

        $request->validate([
            'content' => 'required|string'
        ]);

        Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $product->user_id,
            'product_id' => $product->id, 
            'content' => $request->content
        ]);

        return redirect()->back();
    }
}