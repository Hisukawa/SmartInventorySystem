<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Rename unit_id -> unit_code
        DB::statement('ALTER TABLE system_units CHANGE unit_id unit_code VARCHAR(255)');
    }

    public function down(): void
    {
        // Revert unit_code -> unit_id
        DB::statement('ALTER TABLE system_units CHANGE unit_code unit_id VARCHAR(255)');
    }
};
