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
        Schema::create('webauthn_credentials', function (Blueprint $table) {
            $table->id();

            // Link to users table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Credential ID (base64 encoded, unique per authenticator)
            $table->string('credential_id')->unique();

            // Public key associated with the credential
            $table->longText('public_key');

            // Type (usually "public-key")
            $table->string('type')->default('public-key');

            // Sign counter (for replay attack protection)
            $table->unsignedBigInteger('sign_count')->default(0);

            // Optional: device name / description (e.g., "iPhone", "Laptop")
            $table->string('device_name')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webauthn_credentials');
    }
};
