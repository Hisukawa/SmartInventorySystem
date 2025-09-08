<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('system_units', function (Blueprint $table) {
            // Rename column
            $table->renameColumn('unit_code', 'unit_id');
        });

        Schema::table('peripherals', function (Blueprint $table) {
            // Drop old column if it exists and add new FK properly
            $table->unsignedBigInteger('unit_id')->change();

            $table->foreign('unit_id')
                  ->references('id')
                  ->on('system_units')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('peripherals', function (Blueprint $table) {
            $table->dropForeign(['unit_id']);
            $table->string('unit_id')->change();
        });

        Schema::table('system_units', function (Blueprint $table) {
            $table->renameColumn('unit_id', 'unit_code');
        });
    }
};
