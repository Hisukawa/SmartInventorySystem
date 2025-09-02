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
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('credential_id')->unique(); // rawId from the authenticator
    $table->text('public_key'); // The COSE-encoded public key
    $table->integer('counter')->default(0); // Signature counter
    $table->string('transports')->nullable(); // e.g., 'usb,nfc'
    $table->string('attestation_type')->nullable(); // 'none', 'fido-u2f', etc.
    $table->string('aaguid')->nullable();
    $table->json('trust_path')->nullable(); // If you store attestation trust path
    $table->json('user_handle')->nullable(); // If needed for a specific user ID
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
