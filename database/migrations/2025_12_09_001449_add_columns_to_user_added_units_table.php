<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_added_units', function (Blueprint $table) {
            $table->unsignedBigInteger('mr_id')->nullable()->after('room_id');
            $table->string('condition_details')->nullable()->after('condition');
            $table->string('serial_number')->nullable()->after('condition_details');

            // Optional: add foreign key constraint for mr_id
            $table->foreign('mr_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('user_added_units', function (Blueprint $table) {
            $table->dropForeign(['mr_id']);
            $table->dropColumn(['mr_id', 'condition_details', 'serial_number']);
        });
    }
};
