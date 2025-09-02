<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class WebAuthnController extends Controller
{
    // Helper: generate base64url string
    private function base64urlEncode($data)
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    // Registration - Generate options
    public function registerOptions(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();

        return response()->json([
            'challenge' => $this->base64urlEncode(random_bytes(32)),
            'rp' => ['name' => config('app.name')],
            'user' => [
                'id' => $this->base64urlEncode(pack('N', $user->id)), // binary -> base64url
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

        // Store essential info (already base64url from frontend)
        $user->webauthn_key = json_encode([
            'id' => $credential['id'] ?? null,
            'rawId' => $credential['rawId'] ?? null,
            'type' => $credential['type'] ?? null,
            'response' => [
                'attestationObject' => $credential['response']['attestationObject'] ?? null,
                'clientDataJSON' => $credential['response']['clientDataJSON'] ?? null,
            ],
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
            'challenge' => $this->base64urlEncode(random_bytes(32)),
            'allowCredentials' => [[
                'id' => $storedKey['rawId'] ?? null, // already base64url from storage
                'type' => 'public-key',
            ]],
            'userVerification' => 'required',
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

        // ⚠️ Simplified check — production must verify signatures!
        if ($credential['id'] === ($storedKey['id'] ?? null)) {
            Auth::login($user);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false], 401);
    }
}
