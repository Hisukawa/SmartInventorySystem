<?php



namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FaceLoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'face_descriptor' => 'required|array',
        ]);

        $inputDescriptor = collect($request->face_descriptor);

        // Find user by comparing descriptors
        $users = User::whereNotNull('face_descriptor')->get();

        foreach ($users as $user) {
            $dbDescriptor = collect(json_decode($user->face_descriptor));
            $distance = $this->euclideanDistance($inputDescriptor, $dbDescriptor);

            if ($distance < 0.6) { // threshold for recognition
                Auth::login($user);
                return response()->json([
                    'message' => 'Login successful',
                    'user' => $user,
                ]);
            }
        }

        return response()->json(['message' => 'Face not recognized'], 401);
    }

    private function euclideanDistance($a, $b)
    {
        $sum = 0;
        for ($i = 0; $i < count($a); $i++) {
            $sum += pow($a[$i] - $b[$i], 2);
        }
        return sqrt($sum);
    }
}
