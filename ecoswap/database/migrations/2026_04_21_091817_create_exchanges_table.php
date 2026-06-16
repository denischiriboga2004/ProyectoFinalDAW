<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exchanges', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_offering_id')->constrained('users')->onDelete('restrict');
            $table->foreignId('user_receiving_id')->constrained('users')->onDelete('restrict');

            $table->foreignId('product_offered_id')->constrained('products')->onDelete('restrict');
            $table->foreignId('product_requested_id')->constrained('products')->onDelete('restrict');

            $table->string('status')->default('pending'); // pending, accepted, rejected, completed

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exchanges');
    }
};

