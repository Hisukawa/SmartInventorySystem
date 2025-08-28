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
        // Fix wrong morph types
        DB::table('reports')
            ->where('reportable_type', 'system-units')
            ->update(['reportable_type' => 'App\\Models\\SystemUnit']);

        DB::table('reports')
            ->where('reportable_type', 'peripherals')
            ->update(['reportable_type' => 'App\\Models\\Peripheral']);

        DB::table('reports')
            ->where('reportable_type', 'equipment')
            ->update(['reportable_type' => 'App\\Models\\Equipment']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Rollback to old values
        DB::table('reports')
            ->where('reportable_type', 'App\\Models\\SystemUnit')
            ->update(['reportable_type' => 'system_units']);

        DB::table('reports')
            ->where('reportable_type', 'App\\Models\\Peripheral')
            ->update(['reportable_type' => 'peripherals']);

        DB::table('reports')
            ->where('reportable_type', 'App\\Models\\Equipment')
            ->update(['reportable_type' => 'equipment']);
    }
};
