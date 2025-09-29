<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('room_statuses', function (Blueprint $table) {
            $table->timestamp('logged_out_at')->nullable()->after('is_active');
        });
    }

    public function down()
    {
        Schema::table('room_statuses', function (Blueprint $table) {
            $table->dropColumn('logged_out_at');
        });
    }
};

