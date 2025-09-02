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
    'authenticatorSelection' => [
        'authenticatorAttachment' => 'platform',  // force built-in biometrics
        'userVerification' => 'required',
    ],
]);

    }

    // Registration - Save credential
public function register(Request $request)
{
    $user = User::where('email', $request->email)->firstOrFail();

    $credential = json_decode($request->credential, true);

    // Save in dedicated webauthn_credentials table
    $user->webauthnCredentials()->create([
        'credential_id' => $credential['id'],
        'public_key' => $credential['response']['attestationObject'] ?? '',
        'type' => $credential['type'],
        'sign_count' => 0,
        'device_name' => $request->device_name ?? null,
    ]);

    return response()->json(['success' => true]);
}

    // Login - Generate challenge
 public function loginOptions(Request $request)
{
    $user = User::where('email', $request->email)->firstOrFail();

    $credentials = $user->webauthnCredentials()->get();

    return response()->json([
        'challenge' => rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '='),
        'allowCredentials' => $credentials->map(fn($cred) => [
            'id' => $cred->credential_id,
            'type' => 'public-key',
        ]),
    ]);
}

    // Login - Verify (simplified)
   public function login(Request $request)
{
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['success' => false], 401);
    }

    $credential = $request->input('credential');

    $stored = $user->webauthnCredentials()->where('credential_id', $credential['id'])->first();

    if ($stored) {
        Auth::login($user);
        return response()->json(['success' => true]);
    }

    return response()->json(['success' => false], 401);
}

}
