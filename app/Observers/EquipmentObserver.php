<?php

namespace App\Observers;

use App\Models\Equipment;
use App\Models\EquipmentHistory;
use Illuminate\Support\Facades\Auth;

class EquipmentObserver
{
    /**
     * Handle the Equipment "created" event.
     */
    public function created(Equipment $equipment)
    {
        EquipmentHistory::create([
            'equipment_name' => $equipment->equipment_name,
            'component' => $equipment->type,
            'action' => 'Created',
            'old_value' => '-',
            'new_value' => $equipment->equipment_name,
            'room_id' => $equipment->room_id,
            'user_id' => Auth::id(),
        ]);
    }

    /**
     * Handle the Equipment "updated" event.
     */
    public function updated(Equipment $equipment)
    {
        $fields = ['equipment_name', 'brand', 'type', 'condition', 'room_id'];

        foreach ($fields as $field) {
            if ($equipment->isDirty($field)) {
                $oldValue = $equipment->getOriginal($field);
                $newValue = $equipment->$field;

                // Convert room_id to room number for display
                if ($field === 'room_id') {
                    $oldValue = optional($equipment->room()->find($oldValue))->room_number ?? $oldValue;
                    $newValue = optional($equipment->room()->find($newValue))->room_number ?? $newValue;
                }

                EquipmentHistory::create([
                    'equipment_name' => $equipment->equipment_name,
                    'component' => $equipment->type,
                    'action' => 'Updated',
                    'old_value' => $oldValue,
                    'new_value' => $newValue,
                    'room_id' => $equipment->room_id,
                    'user_id' => Auth::id(),
                ]);
            }
        }
    }

    /**
     * Handle the Equipment "deleted" event.
     */
    public function deleted(Equipment $equipment)
    {
        EquipmentHistory::create([
            'equipment_name' => $equipment->equipment_name,
            'component' => $equipment->type,
            'action' => 'Deleted',
            'old_value' => $equipment->condition,
            'new_value' => '-',
            'room_id' => $equipment->room_id,
            'user_id' => Auth::id(),
        ]);
    }

    /**
     * Handle the Equipment "restored" event.
     */
    public function restored(Equipment $equipment): void
    {
        //
    }

    /**
     * Handle the Equipment "force deleted" event.
     */
    public function forceDeleted(Equipment $equipment): void
    {
        //
    }
}
