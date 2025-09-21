<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // links to users table
            $table->string('user_name');
            $table->string('role');
            $table->enum('action', ['Create', 'Update', 'Delete']);
            $table->text('old_value')->nullable();
            $table->text('new_value')->nullable();
            $table->timestamps(); // includes created_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_histories');
    }
};
