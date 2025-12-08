<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddedUnits extends Model
{
    use HasFactory;

    protected $table = 'user_added_units';
    protected $fillable = [
        'unit_code',
        'processor',
        'ram',
        'storage',
        'gpu',
        'motherboard',
        'condition',
        'condition_details', // added
        'serial_number',  
        'operating_system', // <-- new   // added
        'room_id',
        'added_by',
        'mr_id',             // added
    ];


    // Relationship to the room
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    // Relationship to the user who added the unit
    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }
}
