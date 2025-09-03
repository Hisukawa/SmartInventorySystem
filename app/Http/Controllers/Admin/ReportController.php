<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function show(Report $report)
    {
        return Inertia::render('Admin/ViewReport', [
            'report' => $report->load('user', 'room'),
        ]);
    }

}
