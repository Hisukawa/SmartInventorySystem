<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FaceController extends Controller
{
    // Register user face (store base64 or face token in DB)
    public function register(Request $request)
    {
        $request->validate([
            'face_descriptor' => 'required|string',
            'user_id' => 'required|exists:users,id'
        ]);

        $faceBase64 = $request->face_descriptor;

        // Call Luxand API to detect face
        $response = Http::withHeaders([
            'token' => env('VITE_LUXAND_API_KEY')
        ])->post('https://api.luxand.cloud/photo/detect', [
            'photo' => $faceBase64
        ]);

        if ($response->failed()) {
            return response()->json(['success' => false, 'message' => 'Face API request failed']);
        }

        $result = $response->json();

        if (!isset($result['faces']) || count($result['faces']) === 0) {
            return response()->json(['success' => false, 'message' => 'No face detected']);
        }

        $user = User::find($request->user_id);
        $user->face_descriptor = $faceBase64;
        $user->save();

        return response()->json(['success' => true, 'message' => 'Face registered successfully']);
    }

    // Login with face
    public function login(Request $request)
    {
        $request->validate([
            'face_descriptor' => 'required|string'
        ]);

        $faceBase64 = $request->face_descriptor;
        $users = User::whereNotNull('face_descriptor')->get();

        foreach ($users as $user) {
            $response = Http::withHeaders([
                'token' => env('VITE_LUXAND_API_KEY')
            ])->post('https://api.luxand.cloud/photo/verify', [
                'photo1' => $faceBase64,
                'photo2' => $user->face_descriptor
            ]);

            if ($response->failed()) continue;

            $result = $response->json();

            // Luxand returns "success" and "distance", match if distance < 0.6
            if (isset($result['success'], $result['distance']) && $result['success'] === true && $result['distance'] < 0.6) {
                Auth::login($user); // log in the matched user
                return response()->json([
                    'success' => true,
                    'role' => $user->role,
                    'message' => 'Face matched successfully'
                ]);
            }
        }

        return response()->json(['success' => false, 'message' => 'Face not recognized']);
    }
}
