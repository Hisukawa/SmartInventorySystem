<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('system_units', function (Blueprint $table) {
            // Rename column back to unit_code
            $table->renameColumn('unit_id', 'unit_code');
        });
    }

    public function down(): void
    {
        Schema::table('system_units', function (Blueprint $table) {
            // Rollback: rename back to unit_id
            $table->renameColumn('unit_code', 'unit_id');
        });
    }
};
