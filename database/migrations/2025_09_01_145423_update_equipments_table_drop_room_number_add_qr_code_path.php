<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('equipments', function (Blueprint $table) {
            // Drop old column
            $table->dropColumn('room_number');

            // Add qr_code path
            $table->string('qr_code')->nullable()->after('room_id');
        });
    }

    public function down(): void {
        Schema::table('equipments', function (Blueprint $table) {
            $table->string('room_number')->after('condition');
            $table->dropColumn('qr_code');
        });
    }
};
