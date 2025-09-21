<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('system_unit_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('system_unit_id')
                ->nullable()
                ->constrained('system_units')
                ->nullOnDelete();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('user_name');
            $table->enum('action', ['Create', 'Update', 'Delete', 'Maintenance']);
            $table->string('component');
            $table->text('old_value')->nullable();
            $table->text('new_value')->nullable();
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('system_unit_histories');
    }
};
