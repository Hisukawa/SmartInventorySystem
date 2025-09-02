<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class WebAuthnController extends Controller
{
    // Step 1: Registration - Generate options for authenticator
    public function registerOptions(Request $request)
    {
        return response()->json([
            'challenge' => base64_encode(random_bytes(32)),
            'rp' => ['name' => config('app.name')],
            'user' => [
                'id' => base64_encode($request->user()->id),
                'name' => $request->user()->email,
                'displayName' => $request->user()->name,
            ],
            'pubKeyCredParams' => [['type' => 'public-key', 'alg' => -7]],
        ]);
    }

    // Step 2: Registration - Save credential
    public function register(Request $request)
    {
        $user = $request->user();
        $user->webauthn_key = $request->input('credential'); // store in DB
        $user->save();

        return response()->json(['success' => true]);
    }

    // Step 3: Login - Generate login challenge
    public function loginOptions(Request $request)
    {
        return response()->json([
            'challenge' => base64_encode(random_bytes(32)),
            'allowCredentials' => [
                ['id' => $request->user()->webauthn_key, 'type' => 'public-key']
            ],
        ]);
    }

    // Step 4: Verify login
    public function login(Request $request)
    {
        // Here you’d verify the credential against stored user key
        $user = User::where('email', $request->email)->first();

        if ($user && $request->input('credential') === $user->webauthn_key) {
            Auth::login($user);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false], 401);
    }
}
