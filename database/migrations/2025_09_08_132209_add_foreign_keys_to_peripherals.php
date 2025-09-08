<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('peripherals', function (Blueprint $table) {
            // 1. Ensure room_id is integer type for FK
            $table->unsignedBigInteger('room_id')->change();

            // Add FK for room_id → rooms.id
            $table->foreign('room_id')
                  ->references('id')
                  ->on('rooms')
                  ->onDelete('cascade');

            // 2. Rename unit_code → unit_id
            $table->renameColumn('unit_code', 'unit_id');
        });

        Schema::table('peripherals', function (Blueprint $table) {
            // Change type of unit_id
            $table->unsignedBigInteger('unit_id')->change();

            // Add FK for unit_id → system_units.id
            $table->foreign('unit_id')
                  ->references('id')
                  ->on('system_units')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('peripherals', function (Blueprint $table) {
            // Drop FKs
            $table->dropForeign(['room_id']);
            $table->dropForeign(['unit_id']);

            // Revert unit_id back to string
            $table->string('unit_id')->change();
            $table->renameColumn('unit_id', 'unit_code');
        });
    }
};
