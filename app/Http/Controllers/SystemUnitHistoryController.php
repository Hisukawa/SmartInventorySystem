<?php

namespace App\Http\Controllers;

use App\Models\SystemUnitHistory;
use Inertia\Inertia;

class SystemUnitHistoryController extends Controller
{
    public function index()
    {
        $histories = SystemUnitHistory::with(['user', 'systemUnit'])->latest()
        ->paginate(10);

        return Inertia::render('Admin/Reports/SystemUnitHistories', [
            'histories' => $histories,
        ]);
    }

    public function destroy($id)
    {
        $history = SystemUnitHistory::findOrFail($id);
        $history->delete();

        return response()->json(['success' => true]);
    }
}
