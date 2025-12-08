<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('user_added_peripherals', function (Blueprint $table) {
            $table->text('condition_details')->nullable()->after('condition');
        });
    }

    public function down(): void
    {
        Schema::table('user_added_peripherals', function (Blueprint $table) {
            $table->dropColumn('condition_details');
        });
    }
};

