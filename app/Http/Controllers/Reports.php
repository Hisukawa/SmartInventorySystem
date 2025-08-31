<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class Reports extends Controller
{
    /**
     * Display a listing of the resource.
     */

public function index(Request $request)
{
    $query = Report::with(['room', 'user', 'reportable'])->latest();

    // ✅ Apply filters if provided
    if ($request->filled('room')) {
    $query->where('room_id', $request->room);
}

    if ($request->filled('faculty')) {
        $query->where('user_id', $request->faculty);
    }

    if ($request->filled('reportable_type')) {
        $query->where('reportable_type', $request->reportable_type);
    }

    if ($request->filled('condition')) {
        $query->where('condition', $request->condition);
    }

    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
            $q->where('remarks', 'like', "%{$search}%")
              ->orWhere('condition', 'like', "%{$search}%")
              ->orWhereHas('room', fn($room) =>
                  $room->where('room_number', 'like', "%{$search}%")
              )
              ->orWhereHas('user', fn($user) =>
                  $user->where('name', 'like', "%{$search}%")
              );
        });
    }

    $reports = $query->get();

    // ✅ build filter options (for dropdowns)
        $filterOptions = [
        'faculties' => \App\Models\User::pluck('name', 'id'),
        'reportable_types' => ['peripheral', 'system_unit', 'equipment'],
        'conditions' => Report::select('condition')->distinct()->pluck('condition'),
        'rooms' => \App\Models\Room::pluck('room_number', 'id'),
    ];
   return Inertia::render('Admin/Faculty-Reports/Faculty-reports', [
    'reports' => $reports,
    'filters' => $request->only(['room', 'faculty', 'reportable_type', 'condition', 'search']),
    'filterOptions' => $filterOptions,
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

    $validated['user_id'] = Auth::id();

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
     * Show the form for editing the specified resource.`
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
