<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('system_units', function (Blueprint $table) {
            if (!Schema::hasColumn('system_units', 'unit_path')) {
                $table->string('unit_path')->nullable()->after('unit_code');
            }
        });
    }

    public function down(): void {
        Schema::table('system_units', function (Blueprint $table) {
            if (Schema::hasColumn('system_units', 'unit_path')) {
                $table->dropColumn('unit_path');
            }
        });
    }
};
