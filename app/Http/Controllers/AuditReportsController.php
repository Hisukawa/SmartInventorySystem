<?php

namespace App\Http\Controllers;

use App\Models\AuditReports;
use Illuminate\Http\Request;
use App\Models\Report;
use Inertia\Inertia;
class AuditReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $request->validate([
        'report_id'     => 'required|exists:reports,id',
        'new_condition' => 'required|string',
        'details'       => 'nullable|string',
    ]);

    // Get the original report
    $report = Report::findOrFail($request->report_id);

    // Log the resolution in audit_reports
    AuditReports::create([
        'report_id'     => $report->id,
        'resolved_by'   => auth()->id(),
        'old_condition' => $report->condition,
        'new_condition' => $request->new_condition,
        'details'       => $request->details,
    ]);

    // ✅ Update the actual item's condition
    switch ($report->reportable_type) {
        case 'peripheral':
            $peripheral = $report->reportable;
            if ($peripheral) {
                $peripheral->condition = $request->new_condition;
                $peripheral->save();
            }
            break;

        case 'system_unit':
            $systemUnit = $report->reportable;
            if ($systemUnit) {
                $systemUnit->condition = $request->new_condition;
                $systemUnit->save();
            }
            break;

        case 'equipment':
            $equipment = $report->reportable;
            if ($equipment) {
                $equipment->condition = $request->new_condition;
                $equipment->save();
            }
            break;
    }

    // ✅ Mark the report as resolved
    $report->resolved = true;
    $report->save();

    return back()->with('success', 'Report resolved, item condition updated, and resolution logged.');
}

    /**
     * Display the specified resource.
     */
public function show()
{
    // Get all audit logs
    $auditReports = AuditReports::with(['report', 'resolver'])
        ->orderBy('created_at', 'desc')
        ->get();

    // Return to Inertia page
    return Inertia::render('Admin/Reports/AuditReports', [
        'auditReports' => $auditReports,
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AuditReports $auditReports)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AuditReports $auditReports)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AuditReports $auditReports)
    {
        //
    }
}
