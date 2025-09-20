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
        Schema::create('user_added_equipments', function (Blueprint $table) {
            $table->id();
            $table->string('equipment_code')->unique();
            $table->string('equipment_name');
            $table->string('type');
            $table->string('brand')->nullable();
            $table->string('condition');
            $table->unsignedBigInteger('room_id');
            $table->string('qr_code')->nullable();
            $table->unsignedBigInteger('added_by');
            $table->timestamps();

            // Foreign keys
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            $table->foreign('added_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_added_equipments');
    }
};
