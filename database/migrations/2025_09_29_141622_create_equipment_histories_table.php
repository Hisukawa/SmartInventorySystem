<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('equipment_histories', function (Blueprint $table) {
            $table->id();
            $table->string('equipment_name');
            $table->string('component'); // Furniture / Appliances / Networking / Safety
            $table->string('action'); // Created / Updated / Deleted
            $table->text('old_value')->nullable();
            $table->text('new_value')->nullable();
            $table->foreignId('room_id')->nullable()->constrained('rooms')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_histories');
    }
};
