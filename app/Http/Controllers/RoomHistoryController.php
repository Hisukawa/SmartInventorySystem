<?php

namespace App\Http\Controllers;

use App\Models\RoomHistory;
use Inertia\Inertia;

class RoomHistoryController extends Controller
{
    public function index()
    {
        // Fetch all room histories, latest first
        $histories = RoomHistory::latest()
        ->paginate(10);

        // Pass to Inertia React page
        return Inertia::render('Admin/Reports/RoomHistory', [
            'histories' => $histories
        ]);
    }

    public function destroy($id)
    {
        $history = RoomHistory::findOrFail($id);
        $history->delete();

        return response()->json(['message' => 'History deleted']);
    }
}
