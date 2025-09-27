<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FaceLoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'face_descriptor' => 'required|array',
        ]);

        $inputDescriptor = array_map('floatval', $request->face_descriptor);

        Log::info("📸 Incoming face embedding", [
            'length' => count($inputDescriptor),
            'first10' => array_slice($inputDescriptor, 0, 10),
        ]);

        $users = User::whereNotNull('face_descriptor')->get();
        Log::info("👥 Users with stored embeddings", ['count' => $users->count()]);

        $bestDistance = INF;
        $bestUser = null;

        foreach ($users as $user) {
            $dbDescriptor = json_decode($user->face_descriptor, true);

            if (!$dbDescriptor || !is_array($dbDescriptor)) {
                continue;
            }

            $dbDescriptor = array_map('floatval', $dbDescriptor);
            $distance = $this->euclideanDistance($inputDescriptor, $dbDescriptor);

            if ($distance < $bestDistance) {
                $bestDistance = $distance;
                $bestUser = $user;
            }
        }

        Log::info("🔍 Best match", [
            'distance' => $bestDistance,
            'user_id' => $bestUser?->id,
        ]);

        // ✅ Threshold can be tuned (0.6–0.8 works for Human.js)
        if ($bestUser && $bestDistance < 0.7) {
            Auth::login($bestUser);
            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'redirect' => route('dashboard'),
                'user' => [
                    'id' => $bestUser->id,
                    'email' => $bestUser->email,
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Face not recognized',
        ], 401);
    }

    private function euclideanDistance(array $a, array $b): float
    {
        if (count($a) !== count($b)) {
            return INF;
        }

        $sum = 0.0;
        foreach ($a as $i => $val) {
            $sum += ($val - $b[$i]) ** 2;
        }
        return sqrt($sum);
    }
}
