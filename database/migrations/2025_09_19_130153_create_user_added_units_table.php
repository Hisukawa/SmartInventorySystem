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
        Schema::create('user_added_units', function (Blueprint $table) {
            $table->id();
            $table->string('unit_code')->unique();
            $table->string('processor')->nullable();
            $table->string('ram')->nullable();
            $table->string('storage')->nullable();
            $table->string('gpu')->nullable();
            $table->string('motherboard')->nullable();
            $table->string('condition')->nullable();
            $table->unsignedBigInteger('room_id');
            $table->unsignedBigInteger('added_by');
            $table->timestamps();


            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            
            $table->foreign(columns: 'added_by')->references('id')->on('users')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_added_units');
    }
};
