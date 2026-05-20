<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function show(Product $product)
    {
        $product->load([
            'user',
            'productImages',
            'comments',
        ]);

        // cargar mensajes entre el dueño del producto y el usuario logueado
        $messages = Message::where(function ($q) use ($product) {
            $q->where('sender_id', auth()->id())
              ->where('receiver_id', $product->user_id);
        })->orWhere(function ($q) use ($product) {
            $q->where('sender_id', $product->user_id)
              ->where('receiver_id', auth()->id());
        })->orderBy('created_at')->get();

        return Inertia::render('Chat/Show', [
            'product' => $product,
            'messages' => $messages,
        ]);
    }

    public function send(Request $request, Product $product)
    {
        $request->validate([
            'content' => 'required|string'
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $product->user_id,
            'content' => $request->content
        ]);

        return redirect()->back();
    }
}