<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::dropIfExists('user_added_rooms'); // drop the table
    }

    public function down(): void
    {
        // optional: recreate the table if you roll back
        Schema::create('user_added_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_number');
            $table->string('room_path')->unique();
            $table->unsignedBigInteger('added_by');
            $table->timestamps();
        });
    }
};
