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
        Schema::table('rooms', function (Blueprint $table) {
            //
            $table->dropForeign(['last_scanned_by']);
            $table->dropColumn('last_scanned_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('last_scanned_by');
            $table->foreign('last_scanned_by')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
