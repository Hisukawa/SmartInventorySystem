<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('system_units', function (Blueprint $table) {
            $table->id();
            $table->string('unit_code');
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            $table->string('processor');
            $table->string('ram');
            $table->string('storage');
            $table->string('gpu')->nullable();
            $table->string('motherboard');
            $table->string('condition');
            $table->timestamps();

            // ✅ Ensure unit_code is unique only within the same room
            $table->unique(['unit_code', 'room_id']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('system_units');
    }
};
