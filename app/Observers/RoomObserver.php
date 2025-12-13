<?php

namespace App\Observers;

use App\Models\Room;
use App\Models\RoomHistory;
use App\Models\User;

class RoomObserver
{
    /**
     * Get current user info or fallback to Seeder
     */
    private function getCurrentUser(): array
    {
        // Force all actions to be by Administrator (user ID 1)
        $admin = User::find(1);

        if ($admin) {
            return [
                'id' => $admin->id,
                'name' => $admin->name,
                'role' => $admin->role,
            ];
        }

        // Fallback just in case user ID 1 does not exist
        return [
            'id' => null,
            'name' => 'Seeder',
            'role' => 'system',
        ];
    }

    /**
     * Handle the Room "created" event.
     */
    public function created(Room $room)
    {
        $currentUser = $this->getCurrentUser();

        RoomHistory::create([
            'user_id'   => $currentUser['id'],
            'user_name' => $currentUser['name'],
            'role'      => $currentUser['role'],
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
        $currentUser = $this->getCurrentUser();
        $oldValue = $room->getOriginal('room_number');
        $newValue = $room->room_number;

        RoomHistory::create([
            'user_id'   => $currentUser['id'],
            'user_name' => $currentUser['name'],
            'role'      => $currentUser['role'],
            'action'    => 'Update',
            'old_value' => "Room {$oldValue}",
            'new_value' => "Room {$newValue}",
        ]);
    }

    /**
     * Handle the Room "deleted" event.
     */
    public function deleting(Room $room)
    {
        $currentUser = $this->getCurrentUser();

        RoomHistory::create([
            'user_id'   => $currentUser['id'],
            'user_name' => $currentUser['name'],
            'role'      => $currentUser['role'],
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
        $currentUser = $this->getCurrentUser();

        RoomHistory::create([
            'user_id'   => $currentUser['id'],
            'user_name' => $currentUser['name'],
            'role'      => $currentUser['role'],
            'action'    => 'Restore',
            'old_value' => null,
            'new_value' => "Room {$room->room_number} restored",
        ]);
    }

    /**
     * Handle the Room "force deleted" event.
     */
    public function forceDeleted(Room $room): void
    {
        $currentUser = $this->getCurrentUser();

        RoomHistory::create([
            'user_id'   => $currentUser['id'],
            'user_name' => $currentUser['name'],
            'role'      => $currentUser['role'],
            'action'    => 'Force Delete',
            'old_value' => "Room {$room->room_number}",
            'new_value' => null,
        ]);
    }
}
