<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('product_types', function (Blueprint $table) {
            $table->string('status')->default('active')->after('name');
        });

        Schema::table('product_images', function (Blueprint $table) {
            $table->string('status')->default('active')->after('is_main');
        });
    }

    public function down()
    {
        Schema::table('product_images', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('product_types', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
