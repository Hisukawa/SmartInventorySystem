<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateSystemUnitsUniqueConstraint extends Migration
{
    public function up()
    {
        Schema::table('system_units', function (Blueprint $table) {
            // Drop existing unique index on `unit_code`
            $table->dropUnique(['unit_code']);

            // Add composite unique index on `unit_code` + `room_id`
            $table->unique(['unit_code', 'room_id']);
        });
    }

    public function down()
    {
        Schema::table('system_units', function (Blueprint $table) {
            // Rollback: drop composite unique, restore single unique
            $table->dropUnique(['unit_code', 'room_id']);
            $table->unique('unit_code');
        });
    }
}
