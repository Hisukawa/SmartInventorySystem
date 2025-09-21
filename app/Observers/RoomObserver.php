<?php

namespace App\Observers;

use App\Models\Room;
use App\Models\RoomHistory;
use Illuminate\Support\Facades\Auth;

class RoomObserver
{
    /**
     * Handle the Room "created" event.
     */
    public function created(Room $room)
    {
        RoomHistory::create([
            'user_id'   => Auth::id(),
            'user_name' => Auth::user()->name,
            'role'      => Auth::user()->role,
            'action'    => 'Create',
            'old_value' => null,
            'new_value' => "Room {$room->room_number} created",
        ]);
    }

    /**
     * Handle the Room "updated" event.
     */
    public function updated(Room $room)
    {
        $changes = $room->getChanges(); // get updated attributes
        $oldValue = $room->getOriginal('room_number');
        $newValue = $room->room_number;

        RoomHistory::create([
            'user_id'   => Auth::id(),
            'user_name' => Auth::user()->name,
            'role'      => Auth::user()->role,
            'action'    => 'Update',
            'old_value' => "Room {$oldValue}",
            'new_value' => "Room {$newValue}",
        ]);
    }

    /**
     * Handle the Room "deleted" event.
     */
    public function deleted(Room $room)
    {
        RoomHistory::create([
            'user_id'   => Auth::id(),
            'user_name' => Auth::user()->name,
            'role'      => Auth::user()->role,
            'action'    => 'Delete',
            'old_value' => "Room {$room->room_number}",
            'new_value' => null,
        ]);
    }

    /**
     * Handle the Room "restored" event.
     */
    public function restored(Room $room): void
    {
        //
    }

    /**
     * Handle the Room "force deleted" event.
     */
    public function forceDeleted(Room $room): void
    {
        //
    }
}
