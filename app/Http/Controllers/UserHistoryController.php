<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserHistory;

class UserHistoryController extends Controller
{
    public function index()
    {
        $histories = UserHistory::latest()
        ->paginate(10);
        return inertia('Admin/Reports/UserHistories', [
            'histories' => $histories
        ]);
    }
}
