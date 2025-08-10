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
            $table->unsignedBigInteger('room_id')->nullable()->after('condition');

            // If you have rooms table and want to enforce foreign key:
            // $table->foreign('room_id')->references('id')->on('rooms')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('peripherals', function (Blueprint $table) {
            // If you created foreign key above, drop it first:
            // $table->dropForeign(['room_id']);
            $table->dropColumn('room_id');
        });
    }
};
