<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
{
    $announcements = Announcement::with(['room', 'admin'])
        ->latest()
        ->paginate(3); // show 5 per page

    $rooms = Room::all();

    return Inertia::render('Admin/Announcement/Announce', [
        'announcements' => $announcements,
        'rooms' => $rooms,
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'title'          => 'required|string|max:255',
            'message'        => 'required|string',
            'room_id'        => 'nullable|exists:rooms,id',
            'scheduled_date' => 'required|nullable|date',
        ]);

        Announcement::create([
            'title'          => $request->title,
            'message'        => $request->message,
            'room_id'        => $request->room_id,
            'scheduled_date' => $request->scheduled_date,
            'created_by'     => auth()->id(),
        ]);

        return redirect()->route('admin.announcement');
    }

    public function edit(Announcement $announcement)
    {
        $rooms = Room::all();

        return Inertia::render('Admin/Announcement/EditAnnounce', [
            'announcement' => $announcement->load('room'),
            'rooms'        => $rooms,
        ]);
    }

    public function update(Request $request, Announcement $announcement)
    {
        $request->validate([
            'title'          => 'required|string|max:255',
            'message'        => 'required|string',
            'room_id'        => 'nullable|exists:rooms,id',
            'scheduled_date' => 'nullable|date',
        ]);

        $announcement->update([
            'title'          => $request->title,
            'message'        => $request->message,
            'room_id'        => $request->room_id,
            'scheduled_date' => $request->scheduled_date,
        ]);

        return redirect()->route('admin.announcement')->with('success', 'Announcement updated successfully.');
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return redirect()->route('admin.announcement')->with('success', 'Announcement deleted successfully.');
    }
}
