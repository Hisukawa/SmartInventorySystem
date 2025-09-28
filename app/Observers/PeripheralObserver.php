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
            'user_id' => Auth::id(),
            'peripheral_id' => $peripheral->id,
            'peripheral_code' => $peripheral->peripheral_code,
            'unit_id' => $peripheral->unit_id,
            'room_id' => $peripheral->room_id,
            'action' => 'Created',
            'component' => $peripheral->type,
            'old_value' => null,
            // 'new_value' => $peripheral->type . ' ' . $peripheral->peripheral_code,
            'new_value' => $peripheral->type,
        ]);
    }

    /**
     * Handle the Peripheral "updated" event.
     */
    // public function updated(Peripheral $peripheral)
    // {
    //     $changes = $peripheral->getChanges();
    //     $original = $peripheral->getOriginal();

    //     $fields = ['type', 'serial_number', 'condition', 'room_id', 'unit_id', 'brand', 'model'];

    //     foreach ($fields as $field) {
    //         if (isset($changes[$field])) {
    //             PeripheralHistory::create([
    //                 'user_id' => Auth::id(),
    //                 'peripheral_id' => $peripheral->id,
    //                 'peripheral_code' => $peripheral->peripheral_code,
    //                 'unit_id' => $peripheral->unit_id,
    //                 'room_id' => $peripheral->room_id,
    //                 'action' => 'Updated',
    //                 'component' => ucfirst(str_replace('_', ' ', $field)),
    //                 'old_value' => $original[$field] ?? '-',
    //                 'new_value' => $changes[$field],
    //             ]);
    //         }
    //     }
    // }

    public function updated(Peripheral $peripheral)
    {
        foreach ($peripheral->getChanges() as $field => $newValue) {
            $oldValue = $peripheral->getOriginal($field);

            // Skip unchanged or null values
            if ($oldValue == $newValue) continue;

            $component = ucfirst(str_replace('_', ' ', $field)); // default

            // 🔹 Translate foreign keys into readable names
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
                'user_id'        => Auth::id(),
                'peripheral_id'  => $peripheral->id,
                'peripheral_code'=> $peripheral->peripheral_code,
                'unit_id'        => $peripheral->unit_id,
                'room_id'        => $peripheral->room_id,
                'action'         => 'Updated',
                'component'      => $component,   // ✅ "Room Number" or "Unit Code"
                'old_value'      => $oldValue,    // ✅ "Room 102" instead of 2
                'new_value'      => $newValue,    // ✅ "Room 105" instead of 5
            ]);
        }
    }


    /**
     * Handle the Peripheral "deleted" event.
     */
    public function deleting(Peripheral $peripheral)
    {
        PeripheralHistory::create([
            'user_id' => Auth::id(),
            'peripheral_id' => null, // gets nulled on delete
            'peripheral_code' => $peripheral->peripheral_code, // ✅ keeps the code forever
            'unit_id' => $peripheral->unit_id,
            'room_id' => $peripheral->room_id,
            'action' => 'Deleted',
            'component' => 'Peripheral',
            'old_value' => $peripheral->type,
            'new_value' => null,
        ]);
    }

    /**
     * Handle the Peripheral "restored" event.
     */
    public function restored(Peripheral $peripheral): void
    {
        //
    }

    /**
     * Handle the Peripheral "force deleted" event.
     */
    public function forceDeleted(Peripheral $peripheral): void
    {
        //
    }
}
