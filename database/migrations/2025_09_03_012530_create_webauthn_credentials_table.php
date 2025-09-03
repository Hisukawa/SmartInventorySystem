<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('webauthn_credentials', function (Blueprint $table) {
            $table->id(); // auto-increment ID
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('credential_id')->unique();  // from authenticator (rawId)
            $table->text('public_key');                 // COSE-encoded public key
            $table->unsignedBigInteger('counter')->default(0); // signature counter

            $table->string('transports')->nullable();   // e.g., usb,nfc,ble
            $table->string('attestation_type')->nullable();
            $table->uuid('aaguid')->nullable();

            $table->json('trust_path')->nullable();
            $table->json('user_handle')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('webauthn_credentials');
    }
};
