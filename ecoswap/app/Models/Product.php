<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_type_id',
        'province',
        'swap_for',
        'name',
        'description',
        'estimated_value',
        'status'
    ];

    /**
     * Renombrado de 'images' a 'productImages' para que coincida 
     * con Product::with(['productImages']) en web.php
     */
    public function productImages(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}