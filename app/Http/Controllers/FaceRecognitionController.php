<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FaceRecognitionController extends Controller
{
    /**
     * Verify a user's face descriptor and redirect to target URL.
     */
    public function verify(Request $request)
    {
        try {
            $descriptor = $request->input('descriptor');

            if (!$descriptor || !is_array($descriptor)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No valid face data received.'
                ], 400);
            }

            $registeredFaces = User::whereNotNull('face_descriptor')->get();

            if ($registeredFaces->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No registered faces found.'
                ], 404);
            }

            $minDistance = INF;
            $matchedUser = null;

            foreach ($registeredFaces as $user) {
                $storedDescriptor = json_decode($user->face_descriptor, true);
                if (!is_array($storedDescriptor)) continue;

                $distance = $this->calculateDistance($storedDescriptor, $descriptor);

                if ($distance < $minDistance) {
                    $minDistance = $distance;
                    $matchedUser = $user;
                }
            }

            $threshold = 0.45;

            if ($matchedUser && $minDistance < $threshold) {
                // Log the user in
                Auth::login($matchedUser);

                // Get redirect URL from request OR fallback to intended URL stored in session
                $redirectUrl = $request->input('redirect_url', session()->pull('url.intended', route('dashboard')));


                if ($request->ajax() || $request->expectsJson()) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Face verified and user logged in!',
                        'redirect_url' => $redirectUrl
                    ]);
                }

                return redirect($redirectUrl);
            }

            return response()->json([
                'success' => false,
                'distance' => $minDistance,
                'message' => 'No matching face found.'
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Register or update the user's face descriptor.
     */
    public function registerFace(Request $request)
    {
        $request->validate([
            'descriptor' => 'required|array',
        ]);

        $user = $request->user() ?? User::find($request->input('user_id'));

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'No authenticated or valid user found.'
            ], 401);
        }

        $user->face_descriptor = json_encode($request->descriptor);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Face registered successfully!',
            'role' => $user->role ?? null,
        ]);
    }

    /**
     * Euclidean distance between two vectors.
     */
    private function calculateDistance(array $a, array $b): float
    {
        $sum = 0.0;
        $length = min(count($a), count($b));

        for ($i = 0; $i < $length; $i++) {
            $sum += ($a[$i] - $b[$i]) ** 2;
        }

        return sqrt($sum);
    }
}
