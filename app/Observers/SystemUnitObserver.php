<?php

namespace App\Observers;

use App\Models\SystemUnit;
use App\Models\SystemUnitHistory;
use Illuminate\Support\Facades\Auth;

class SystemUnitObserver
{
    /**
     * Handle the SystemUnit "created" event.
     */
    public function created(SystemUnit $systemUnit): void
    {
            SystemUnitHistory::create([
            'system_unit_id' => $systemUnit->id,
            'user_id' => Auth::id(),
            'user_name' => Auth::user()->name,
            'action' => 'Create',
            'component' => 'Entire Unit',
            'old_value' => null,
            'new_value' => $systemUnit->unit_code,
        ]);
    }

    /**
     * Handle the SystemUnit "updated" event.
     */
    public function updated(SystemUnit $systemUnit): void
    {
        foreach ($systemUnit->getChanges() as $field => $newValue) {
            if (in_array($field, ['ram', 'gpu', 'storage', 'cpu'])) {
                SystemUnitHistory::create([
                    'system_unit_id' => $systemUnit->id,
                    'user_id' => Auth::id(),
                    'user_name' => Auth::user()->name,
                    'action' => 'Update',
                    'component' => strtoupper($field),
                    'old_value' => $systemUnit->getOriginal($field),
                    'new_value' => $newValue,
                ]);
            }
        }
    }

    /**
     * Handle the SystemUnit "deleted" event.
     */
    public function deleting(SystemUnit $systemUnit): void
    {
        SystemUnitHistory::create([
            'system_unit_id' => null, // don't reference deleted unit
            'user_id'        => Auth::id(),
            'user_name'      => Auth::user()->name,
            'action'         => 'Delete',
            'component'      => 'Entire Unit',
            'old_value'      => $systemUnit->unit_code,
            'new_value'      => null,
        ]);
    }


    /**
     * Handle the SystemUnit "restored" event.
     */
    public function restored(SystemUnit $systemUnit): void
    {
        //
    }

    /**
     * Handle the SystemUnit "force deleted" event.
     */
    public function forceDeleted(SystemUnit $systemUnit): void
    {
        //
    }
}
