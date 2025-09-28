<?php

namespace App\Http\Controllers;

use App\Models\PeripheralHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeripheralHistoryController extends Controller
{
    public function index()
    {
        $histories = PeripheralHistory::with(['user', 'peripheral', 'unit', 'room'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Reports/PeripheralHistory', [
            'histories' => $histories,
        ]);
    }

    public function destroy($id)
    {
        $history = PeripheralHistory::findOrFail($id);
        $history->delete();

        return response()->json([
            'message' => 'History deleted successfully',
        ]);
    }
}
