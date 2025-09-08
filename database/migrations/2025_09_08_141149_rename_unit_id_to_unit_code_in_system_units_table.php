<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('ALTER TABLE system_units CHANGE unit_id unit_code VARCHAR(255)');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE system_units CHANGE unit_code unit_id VARCHAR(255)');
    }
};
