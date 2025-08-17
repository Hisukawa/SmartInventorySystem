<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('equipments', function (Blueprint $table) {
            $table->id();
            $table->string('equipment_code')->unique(); // EQP-01, EQP-02, etc.
            $table->string('type');
            $table->string('brand')->nullable();
            $table->string('condition');
            $table->string('room_number');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('equipments');
    }
};
