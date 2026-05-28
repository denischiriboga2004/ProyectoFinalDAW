<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exchange extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_offering_id',
        'user_receiving_id',
        'product_offered_id',
        'product_requested_id',
        'status'
    ];

    public function userOffering()
    {
        return $this->belongsTo(User::class, 'user_offering_id');
    }

    public function userReceiving()
    {
        return $this->belongsTo(User::class, 'user_receiving_id');
    }

    public function productOffered()
    {
        return $this->belongsTo(Product::class, 'product_offered_id');
    }

    public function productRequested()
    {
        return $this->belongsTo(Product::class, 'product_requested_id');
    }
}