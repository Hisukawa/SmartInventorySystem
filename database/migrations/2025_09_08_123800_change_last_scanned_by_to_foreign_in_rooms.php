<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            // Step 1: Drop varchar column
            $table->dropColumn('last_scanned_by');
        });

        Schema::table('rooms', function (Blueprint $table) {
            // Step 2: Recreate as unsignedBigInteger (nullable if needed)
            $table->unsignedBigInteger('last_scanned_by')->nullable()->after('status');

            // Step 3: Add foreign key
            $table->foreign('last_scanned_by')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null'); // You can also use cascade/restrict
        });
    }

    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            // Rollback: drop FK + column, recreate as varchar
            $table->dropForeign(['last_scanned_by']);
            $table->dropColumn('last_scanned_by');
            $table->string('last_scanned_by', 255)->nullable()->after('status');
        });
    }
};
