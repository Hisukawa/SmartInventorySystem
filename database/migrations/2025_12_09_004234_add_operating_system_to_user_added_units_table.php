<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
        public function up()
        {
            Schema::table('user_added_units', function (Blueprint $table) {
                $table->string('operating_system')->nullable()->after('serial_number');
            });
        }

        public function down()
        {
            Schema::table('user_added_units', function (Blueprint $table) {
                $table->dropColumn('operating_system');
            });
        }

};
