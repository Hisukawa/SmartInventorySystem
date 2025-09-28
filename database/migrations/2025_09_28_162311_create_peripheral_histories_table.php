<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('peripheral_histories', function (Blueprint $table) {
            $table->id();

            // User who made the action
            $table->foreignId('user_id')
                  ->constrained()
                  ->onDelete('cascade');

            // Peripheral reference (nullable after deletion)
            $table->foreignId('peripheral_id')
                  ->nullable()
                  ->constrained()
                  ->onDelete('set null');

            // Keep a permanent copy of peripheral code
            $table->string('peripheral_code')->nullable();

            // System unit reference
            $table->foreignId('unit_id')
                  ->nullable()
                  ->constrained('system_units')
                  ->onDelete('set null');

            // Room reference
            $table->foreignId('room_id')
                  ->nullable()
                  ->constrained('rooms')
                  ->onDelete('set null');

            // Action details
            $table->string('action');
            $table->string('component');
            $table->string('old_value')->nullable();
            $table->string('new_value')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peripheral_histories');
    }
};
