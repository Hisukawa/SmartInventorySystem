<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('system_units', function (Blueprint $table) {
            // Drop composite unique index
            $table->dropUnique('system_units_unit_code_room_id_unique');
        });
    }

    public function down(): void
    {
        Schema::table('system_units', function (Blueprint $table) {
            // Re-add composite unique index with same name
            $table->unique(['unit_code', 'room_id'], 'system_units_unit_code_room_id_unique');
        });
    }
};
