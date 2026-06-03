<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Message;
use App\Models\Notification;
use App\Mail\MessageReceived;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ChatController extends Controller
{
    public function show(Product $product)
    {
        $authId = auth()->id();

        // Permitimos que el propietario vea la conversación (para revisar mensajes recibidos).
        // La lógica que evita enviar mensajes a tu propio producto permanece en el método send.

        $product->load([
            'user',
            'productImages',
            'comments',
        ]);

        $product->product_images = $product->productImages->map(function ($img) {
            $img->url = $img->url ?? (isset($img->image_path) ? Storage::url($img->image_path) : null);
            return $img;
        });
        $product->images = $product->product_images;

        // Obtener todos los mensajes del producto donde el usuario autenticado
        // participa como emisor o receptor (funciona tanto para comprador como vendedor).
        $messages = Message::where('product_id', $product->id)
            ->where(function ($q) use ($authId) {
                $q->where('sender_id', $authId)
                  ->orWhere('receiver_id', $authId);
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
                            return ['url' => $img->url ?? (isset($img->image_path) ? Storage::url($img->image_path) : null)]; 
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
        $request->validate([
            'content' => 'required|string'
        ]);

        $authId = auth()->id();

        // Determinar destinatario: si el emisor es distinto al propietario del producto,
        // el receptor será el propietario; si el emisor es el propietario, buscamos
        // al otro participante en los mensajes existentes.
        if ($authId !== $product->user_id) {
            $receiverId = $product->user_id;
        } else {
            // El propietario responde: intentar obtener el último otro participante
            $last = Message::where('product_id', $product->id)
                ->where(function ($q) use ($authId) {
                    $q->where('sender_id', '!=', $authId)
                      ->orWhere('receiver_id', '!=', $authId);
                })
                ->latest()
                ->first();

            if (!$last) {
                return abort(403, 'No hay destinatario para este producto.');
            }

            $receiverId = $last->sender_id === $authId ? $last->receiver_id : $last->sender_id;
        }

        $message = Message::create([
            'sender_id' => $authId,
            'receiver_id' => $receiverId,
            'product_id' => $product->id,
            'content' => $request->content,
        ]);

        $message->load(['sender', 'receiver', 'product']);

        Notification::create([
            'user_id' => $receiverId,
            'type' => 'message',
            'message' => "Tienes un mensaje nuevo de {$message->sender->name}",
            'read' => false,
        ]);

        if (config('mail.send_emails') && $message->receiver && $message->receiver->email) {
            Mail::to($message->receiver->email)->send(new MessageReceived(
                $message->receiver->name,
                $message->sender->name,
                $message->product->name,
                $message->content,
                $message->product->id
            ));
        }

        return redirect()->back();
    }
}