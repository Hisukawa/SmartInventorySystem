<?php

namespace App\Observers;

use App\Models\Peripheral;
use App\Models\PeripheralHistory;
use Illuminate\Support\Facades\Auth;

class PeripheralObserver
{
    /**
     * Handle the Peripheral "created" event.
     */
    public function created(Peripheral $peripheral)
    {
        PeripheralHistory::create([
            'user_id'        => Auth::id() ?? 1, // fallback default admin
            'peripheral_id'  => $peripheral->id,
            'peripheral_code'=> $peripheral->peripheral_code,
            'unit_id'        => $peripheral->unit_id,
            'room_id'        => $peripheral->room_id,
            'action'         => 'Created',
            'component'      => $peripheral->type,
            'old_value'      => null,
            'new_value'      => $peripheral->type,
        ]);
    }

    /**
     * Handle the Peripheral "updated" event.
     */
    public function updated(Peripheral $peripheral)
    {
        foreach ($peripheral->getChanges() as $field => $newValue) {
            $oldValue = $peripheral->getOriginal($field);

            // Skip unchanged or null values
            if ($oldValue == $newValue) continue;

            $component = ucfirst(str_replace('_', ' ', $field));

            // Translate foreign keys
            if ($field === 'room_id') {
                $component = 'Room Number';
                $oldRoom = \App\Models\Room::find($oldValue);
                $newRoom = \App\Models\Room::find($newValue);
                $oldValue = $oldRoom ? 'Room ' . $oldRoom->room_number : $oldValue;
                $newValue = $newRoom ? 'Room ' . $newRoom->room_number : $newValue;
            }

            if ($field === 'unit_id') {
                $component = 'Unit Code';
                $oldValue = optional(\App\Models\SystemUnit::find($oldValue))->unit_code ?? $oldValue;
                $newValue = optional(\App\Models\SystemUnit::find($newValue))->unit_code ?? $newValue;
            }

            PeripheralHistory::create([
                'user_id'        => Auth::id() ?? 1, // fallback default admin
                'peripheral_id'  => $peripheral->id,
                'peripheral_code'=> $peripheral->peripheral_code,
                'unit_id'        => $peripheral->unit_id,
                'room_id'        => $peripheral->room_id,
                'action'         => 'Updated',
                'component'      => $component,
                'old_value'      => $oldValue,
                'new_value'      => $newValue,
            ]);
        }
    }

    /**
     * Handle the Peripheral "deleted" event.
     */
    public function deleting(Peripheral $peripheral)
    {
        PeripheralHistory::create([
            'user_id'        => Auth::id() ?? 1, // fallback default admin
            'peripheral_id'  => null,
            'peripheral_code'=> $peripheral->peripheral_code,
            'unit_id'        => $peripheral->unit_id,
            'room_id'        => $peripheral->room_id,
            'action'         => 'Deleted',
            'component'      => 'Peripheral',
            'old_value'      => $peripheral->type,
            'new_value'      => null,
        ]);
    }

    public function restored(Peripheral $peripheral): void {}
    public function forceDeleted(Peripheral $peripheral): void {}
}
