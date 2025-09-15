<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            // ✅ Fix wrong plural value in reportable_type
            DB::table('reports')
                ->where('reportable_type', 'equipments')
                ->update(['reportable_type' => 'equipment']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            // ✅ Rollback if needed
            DB::table('reports')
                ->where('reportable_type', 'equipment')
                ->update(['reportable_type' => 'equipments']);
        });
    }
};
