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
                // Check if user has deactivated face recognition
                if (!$matchedUser->face_recognition_enabled) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Face recognition is disabled for this user.'
                    ], 403);
                }

                // Log the user in
                Auth::login($matchedUser);

                // Determine redirect URL
                if (strtolower($matchedUser->role) === 'admin') {
                    // Admin users go to admin dashboard
                    $redirectUrl = route('admin.dashboard');
                } else {
                    // Other users go to profile page
                    $profileRedirect = route('profile.edit');
                    $redirectUrl = $request->input('redirect_url', session()->pull('url.intended', $profileRedirect));
                }

                // Return JSON for AJAX requests
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
        $user->face_recognition_enabled = true; // auto-enable when registered
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Face registered successfully!',
            'role' => $user->role ?? null,
        ]);
    }

    /**
     * Deactivate face recognition (keeps descriptor but disables login).
     */
    public function deactivate(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not authenticated.'], 401);
        }

        $user->face_recognition_enabled = false;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Face recognition has been deactivated.'
        ]);
    }

    /**
     * Delete face recognition data (completely removes descriptor).
     */
    public function deleteFaceData(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not authenticated.'], 401);
        }

        $user->face_descriptor = null;
        $user->face_recognition_enabled = false;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Face recognition data has been deleted.'
        ]);
    }

    /**
     * Reactivate face recognition (enable login again without re-scanning).
     */
    public function reactivate(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not authenticated.'], 401);
        }

        // Only allow reactivation if the face descriptor still exists
        if (!$user->face_descriptor) {
            return response()->json([
                'success' => false,
                'message' => 'No saved face data found. Please re-register your face.'
            ], 404);
        }

        $user->face_recognition_enabled = true;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Face recognition has been reactivated.'
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
