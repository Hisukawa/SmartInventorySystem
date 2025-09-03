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
    $user = User::where('email', $request->email)->firstOrFail();

    $storedKey = json_decode($user->webauthn_key, true);

    if (!$storedKey || !isset($storedKey['rawId'])) {
        return response()->json([
            'error' => 'No WebAuthn credentials found for this user.'
        ], 400);
    }

    return response()->json([
        'challenge' => rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '='),
        'allowCredentials' => [[
            'id' => $storedKey['rawId'], // should be base64url string
            'type' => 'public-key',
        ]],
    ]);
}


    /**
     * Login - Verify (simplified)
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['success' => false], 401);
        }

        $credential = $request->input('credential');
        $storedCredential = WebauthnCredential::where('credential_id', $credential['id'])->first();

        // Simplified check (production: validate signature properly)
        if ($storedCredential && $credential['rawId'] === $storedCredential->public_key) {
            Auth::login($user);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false], 401);
    }
}
