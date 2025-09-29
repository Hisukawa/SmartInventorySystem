<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\EquipmentHistory;

class EquipmentHistoryController extends Controller
{
    public function index()
    {
        // Fetch all histories with user and room relations
        $histories = EquipmentHistory::with(['user', 'room'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Return Inertia page
        return Inertia::render('Admin/Reports/EquipmentHistory', [
            'histories' => $histories,
        ]);
    }

    public function destroy($id)
    {
        $history = EquipmentHistory::findOrFail($id);
        $history->delete();

        return response()->json([
            'message' => 'History deleted successfully',
        ]);
    }
}
