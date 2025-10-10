<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
        {
            Schema::table('peripherals', function (Blueprint $table) {
                $table->text('condition_details')->nullable()->after('condition');
            });
        }

        public function down(): void
        {
            Schema::table('peripherals', function (Blueprint $table) {
                $table->dropColumn('condition_details');
            });
        }
};
