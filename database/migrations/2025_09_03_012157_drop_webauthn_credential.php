<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations (drop the table).
     */
    public function up(): void
    {
        Schema::dropIfExists('webauthn_credentials');
    }

    /**
     * Reverse the migrations (recreate the table).
     */
    public function down(): void
    {
        Schema::create('webauthn_credentials', function (Blueprint $table) {
            $table->string('id', 510);
            $table->string('authenticatable_type', 255)->index();
            $table->unsignedBigInteger('authenticatable_id')->index();
            $table->char('user_id', 36);
            $table->string('alias', 255)->nullable();
            $table->unsignedBigInteger('counter')->nullable();
            $table->string('rp_id', 255);
            $table->string('origin', 255);
            $table->longText('transports')->nullable();
            $table->char('aaguid', 36)->nullable();
            $table->text('public_key');
            $table->string('attestation_format', 255);
            $table->longText('certificates')->nullable();
            $table->timestamp('disabled_at')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }
};
