<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class WebAuthnController extends Controller
{
    // Registration - Generate options
    public function registerOptions(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();

        return response()->json([
            'challenge' => rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '='),
            'rp' => ['name' => config('app.name')],
            'user' => [
                'id' => rtrim(strtr(base64_encode(pack('N', $user->id)), '+/', '-_'), '='),
                'name' => $user->email,
                'displayName' => $user->name,
            ],
            'pubKeyCredParams' => [
                ['type' => 'public-key', 'alg' => -7],    // ES256
                ['type' => 'public-key', 'alg' => -257],  // RS256
            ],
            'timeout' => 60000,
            'attestation' => 'none',
        ]);
    }

    // Registration - Save credential
    public function register(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();

        $credential = $request->input('credential');

        // Store essential info
        $user->webauthn_key = json_encode([
            'id' => $credential['id'] ?? null,
            'rawId' => $credential['rawId'] ?? null,
            'type' => $credential['type'] ?? null,
            'attestationObject' => $credential['response']['attestationObject'] ?? null,
            'clientDataJSON' => $credential['response']['clientDataJSON'] ?? null,
        ]);

        $user->save();

        return response()->json(['success' => true]);
    }

    // Login - Generate challenge
    public function loginOptions(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();

        $storedKey = json_decode($user->webauthn_key, true);

        return response()->json([
            'challenge' => rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '='),
            'allowCredentials' => [[
                'id' => $storedKey['rawId'] ?? null,
                'type' => 'public-key',
            ]],
            'userVerification' => 'required', // force Face Unlock/Fingerprint on login too
        ]);
    }

    // Login - Verify (⚠ simplified!)
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['success' => false], 401);
        }

        $credential = $request->input('credential');
        $storedKey = json_decode($user->webauthn_key, true);

        // ⚠️ This is simplified. In production, use a WebAuthn PHP package to verify signatures.
        if ($credential['id'] === ($storedKey['id'] ?? null)) {
            Auth::login($user);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false], 401);
    }
}
