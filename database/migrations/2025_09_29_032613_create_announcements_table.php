<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('message');
            $table->unsignedBigInteger('room_id')->nullable(); // Maintenance can be for all rooms or specific
            $table->date('scheduled_date');
            $table->unsignedBigInteger('created_by'); // Always admin
            $table->timestamps();

            // Relationships
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
