<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Product; // Importamos el modelo Product

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'product_id', // <-- 1. IMPORTANTE: Añadir esto aquí
        'content'
    ];

    // 2. NUEVA RELACIÓN: Un mensaje pertenece a un producto
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}