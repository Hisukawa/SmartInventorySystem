<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Room;

class UserAddedEquipments extends Model
{
    protected $fillable = [
        'equipment_code',
        'equipment_name',
        'type',
        'brand',
        'condition',
        'room_id',
        'qr_code',
        'added_by',
    ];

    /**
     * Get the user who added this equipment.
     */
    public function addedBy()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    /**
     * Get the room where this equipment is located.
     */
    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
