<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'email_verified_at',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function messagesSent()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function messagesReceived()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function exchangesAsSender()
    {
        return $this->hasMany(Exchange::class, 'user_offering_id');
    }

    public function exchangesAsReceiver()
    {
        return $this->hasMany(Exchange::class, 'user_receiving_id');
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function profileComments()
    {
        return $this->hasMany(Comment::class, 'target_user_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}