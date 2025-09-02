<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class WebAuthnController extends Controller
{
    // Step 1: Registration - Generate options for authenticator
  public function register(Request $request)
{
    $user = $request->user();

    $credential = json_decode($request->input('credential'), true);

    // Save only credential id (base64url encoded)
    $user->webauthn_credential_id = $credential['id'];
    $user->save();

    return response()->json(['success' => true]);
}

public function loginOptions(Request $request)
{
    $user = User::where('email', $request->email)->first();

    if (! $user || ! $user->webauthn_credential_id) {
        return response()->json(['error' => 'No device registered'], 400);
    }

    return response()->json([
        'challenge' => base64_encode(random_bytes(32)),
        'allowCredentials' => [
            [
                'id' => $user->webauthn_credential_id,
                'type' => 'public-key',
            ],
        ],
    ]);
}

public function login(Request $request)
{
    $user = User::where('email', $request->email)->first();

    // ⚠️ Here you should verify signature with crypto lib
    // For demo/testing, just check credential id matches
    $credential = json_decode($request->input('credential'), true);

    if ($user && $credential['id'] === $user->webauthn_credential_id) {
        Auth::login($user);
        return response()->json(['success' => true]);
    }

    return response()->json(['success' => false], 401);
}
}
