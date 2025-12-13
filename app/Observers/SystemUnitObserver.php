<?php

namespace App\Observers;

use App\Models\SystemUnit;
use App\Models\SystemUnitHistory;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class SystemUnitObserver
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
            ];
        }

        // Fallback just in case user ID 1 does not exist
        return [
            'id' => null,
            'name' => 'Seeder',
        ];
    }


    /**
     * Handle the SystemUnit "created" event.
     */
    public function created(SystemUnit $systemUnit): void
    {
        $currentUser = $this->getCurrentUser();

        SystemUnitHistory::create([
            'system_unit_id' => $systemUnit->id,
            'user_id'        => $currentUser['id'],
            'user_name'      => $currentUser['name'],
            'action'         => 'Create',
            'component'      => 'Entire Unit',
            'old_value'      => null,
            'new_value'      => $systemUnit->unit_code,
        ]);
    }

    /**
     * Handle the SystemUnit "updated" event.
     */
    public function updated(SystemUnit $systemUnit): void
    {
        $currentUser = $this->getCurrentUser();

        foreach ($systemUnit->getChanges() as $field => $newValue) {
            if (in_array($field, ['ram', 'gpu', 'storage', 'processor', 'condition'])) {
                SystemUnitHistory::create([
                    'system_unit_id' => $systemUnit->id,
                    'user_id'        => $currentUser['id'],
                    'user_name'      => $currentUser['name'],
                    'action'         => 'Update',
                    'component'      => strtoupper($field),
                    'old_value'      => $systemUnit->getOriginal($field),
                    'new_value'      => $newValue,
                ]);
            }
        }
    }

    /**
     * Handle the SystemUnit "deleted" event.
     */
    public function deleting(SystemUnit $systemUnit): void
    {
        $currentUser = $this->getCurrentUser();

        SystemUnitHistory::create([
            'system_unit_id' => null, // don't reference deleted unit
            'user_id'        => $currentUser['id'],
            'user_name'      => $currentUser['name'],
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
        $currentUser = $this->getCurrentUser();

        SystemUnitHistory::create([
            'system_unit_id' => $systemUnit->id,
            'user_id'        => $currentUser['id'],
            'user_name'      => $currentUser['name'],
            'action'         => 'Restore',
            'component'      => 'Entire Unit',
            'old_value'      => null,
            'new_value'      => $systemUnit->unit_code,
        ]);
    }

    /**
     * Handle the SystemUnit "force deleted" event.
     */
    public function forceDeleted(SystemUnit $systemUnit): void
    {
        $currentUser = $this->getCurrentUser();

        SystemUnitHistory::create([
            'system_unit_id' => null,
            'user_id'        => $currentUser['id'],
            'user_name'      => $currentUser['name'],
            'action'         => 'Force Delete',
            'component'      => 'Entire Unit',
            'old_value'      => $systemUnit->unit_code,
            'new_value'      => null,
        ]);
    }
}
