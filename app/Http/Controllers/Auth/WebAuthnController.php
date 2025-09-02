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
  // Registration - Save credential
public function register(Request $request)
{
    $user = User::where('email', $request->email)->firstOrFail();

    $credential = $request->credential;

    $user->webauthn_key = json_encode([
        'id' => $credential['id'],
        'rawId' => $credential['rawId'],
        'type' => $credential['type'],
        'response' => $credential['response'], // includes attestationObject + clientDataJSON
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
// Login - Verify (simplified)
public function login(Request $request)
{
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['success' => false], 401);
    }

    $credential = $request->input('credential');
    $storedKey = json_decode($user->webauthn_key, true);

    if ($credential['rawId'] === $storedKey['rawId']) {
        Auth::login($user);
        return response()->json(['success' => true]);
    }

    return response()->json(['success' => false], 401);
}

}
