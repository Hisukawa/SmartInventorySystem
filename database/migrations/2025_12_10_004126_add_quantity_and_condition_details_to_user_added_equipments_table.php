<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_added_equipments', function (Blueprint $table) {
            $table->integer('quantity')->default(1)->after('condition');
            $table->string('condition_details', 500)->nullable()->after('quantity');
        });
    }

    public function down(): void
    {
        Schema::table('user_added_equipments', function (Blueprint $table) {
            $table->dropColumn(['quantity', 'condition_details']);
        });
    }
};
