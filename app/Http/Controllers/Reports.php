<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Reports extends Controller
{
    /**
     * Display a listing of the resource.
     */
      public function index()
    {
        // Load reports with relationships (room + user)
        $reports = Report::with(['room', 'user'])
            ->latest()
            ->get();

        return Inertia::render('Admin/Faculty-Reports/Faculty-reports', [
            'reports' => $reports,
        ]);
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
    // Validate
    $validated = $request->validate([
        'reportable_type' => 'required|string',
        'reportable_id'   => 'required|integer',
        'room_id'         => 'required|integer',
        'condition'       => 'required|string|max:255',
        'remarks'         => 'nullable|string',
        'photo'           => 'nullable|image|max:2048',
    ]);

    $validated['user_id'] = auth()->id();

    // Handle photo upload
    if ($request->hasFile('photo')) {
        $validated['photo_path'] = $request->file('photo')->store('reports', 'public');
    } else {
        $validated['photo_path'] = null; // ✅ explicitly set null if no photo
    }

    // Save
    Report::create($validated);

    // ✅ Return JSON for Inertia
    return redirect()->back()->with('success', 'Report submitted successfully!');

}


    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        //
    }
}
