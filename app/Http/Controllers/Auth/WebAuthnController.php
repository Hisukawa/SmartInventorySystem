<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\WebauthnCredential;
use Illuminate\Support\Facades\Auth;

class WebAuthnController extends Controller
{
    /**
     * Registration - Generate options for authenticator
     */
    public function registerOptions(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();

        return response()->json([
            'challenge' => rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '='),
            'rp' => ['name' => config('app.name')],
            'user' => [
                // Use binary-safe ID (uint32 packed, base64url encoded)
                'id' => rtrim(strtr(base64_encode(pack('N', $user->id)), '+/', '-_'), '='),
                'name' => $user->email,
                'displayName' => $user->name,
            ],
            'pubKeyCredParams' => [
                ['type' => 'public-key', 'alg' => -7],    // ES256
                ['type' => 'public-key', 'alg' => -257],  // RS256
            ],
        ]);
    }

    /**
     * Registration - Store credential
     */
    public function register(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();
        $credential = json_decode($request->credential, true);

        // Store in webauthn_credentials table
        WebauthnCredential::create([
            'user_id'        => $user->id,
            'credential_id'  => $credential['id'],
            'public_key'     => $credential['rawId'], // NOTE: should really extract real publicKey in production
            'counter'        => 0,
            'transports'     => $credential['transports'] ?? null,
            'attestation_type' => $credential['type'] ?? null,
            'aaguid'         => $credential['aaguid'] ?? null,
            'trust_path'     => null,
            'user_handle'    => null,
        ]);

        return response()->json(['success' => true]);
    }

    /**
     * Login - Generate challenge for this user
     */
    public function loginOptions(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $challenge = rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '=');

        if (!$user) {
            // Return a consistent structure even if user not found,
            // but indicate the error.
            return response()->json([
                'challenge' => $challenge, // Still provide a challenge
                'allowCredentials' => [],
                'error' => 'User not found or no WebAuthn devices registered for this user.',
            ]);
        }

        $creds = WebauthnCredential::where('user_id', $user->id)->get();

        // If no credentials found for the user, return an error message
        if ($creds->isEmpty()) {
            return response()->json([
                'challenge' => $challenge,
                'allowCredentials' => [],
                'error' => 'No registered WebAuthn device found for this user. Please register a device first.',
            ]);
        }

        return response()->json([
            'challenge' => $challenge,
            'allowCredentials' => $creds->map(fn($c) => [
                'id'   => $c->credential_id,
                'type' => 'public-key',
            ])->values()->all(),
        ]);
    }

    /**
     * Login - verify (very simplified)
     * In production you must verify the signature with the stored public key.
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Invalid user.'], 401);
        }

        $credential = $request->input('credential');
        if (!$credential || empty($credential['id']) || empty($credential['rawId'])) {
            return response()->json(['success' => false, 'message' => 'Invalid credential payload.'], 422);
        }

        $stored = WebauthnCredential::where('credential_id', $credential['id'])->first();

        // Simplified: accept if rawId matches what we stored as "public_key"
        // In a real application, you would perform a full WebAuthn verification
        // which includes verifying the signature with the public key.
        if ($stored) {
            // Here, we are comparing the rawId from the assertion with the stored public_key.
            // This is a very simplified comparison. In a production system,
            // you'd need a robust WebAuthn verification library to properly
            // validate the assertion (clientDataJSON, authenticatorData, signature).
            // For a minimal working example, we'll keep your existing rawId comparison.
            // However, be aware this is NOT cryptographically secure by itself.
            if ($stored->public_key === $credential['rawId']) {
                Auth::login($user);
                return response()->json(['success' => true]);
            }
        }

        return response()->json(['success' => false, 'message' => 'Credential not recognized or invalid.'], 401);
    }
}