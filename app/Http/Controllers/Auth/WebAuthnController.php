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
        ]);
    }

    // Registration - Save credential
    public function register(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();

        $credential = json_decode($request->credential, true);

        $user->webauthn_key = json_encode([
            'id' => $credential['id'],
            'rawId' => $credential['rawId'],
            'type' => $credential['type'],
            'publicKey' => $credential['response'] ?? null, // needs proper parsing
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
                'id' => $storedKey['rawId'],
                'type' => 'public-key',
            ]],
        ]);
    }

    // Login - Verify (simplified)
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['success' => false], 401);
        }

        // ⚠️ Proper verification needed with a WebAuthn lib.
        // For now, accept if IDs match.
        $credential = $request->input('credential');

        $storedKey = json_decode($user->webauthn_key, true);

        if ($credential['id'] === $storedKey['id']) {
            Auth::login($user);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false], 401);
    }
}
