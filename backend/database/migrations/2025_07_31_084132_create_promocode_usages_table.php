<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('promocode_usages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('promocode_id')
                  ->constrained('promocodes');
            $table->foreignId('order_id')
                  ->unique()
                  ->constrained('orders');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('promocode_usages');
    }
};
