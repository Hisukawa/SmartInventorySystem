<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddedPeripherals extends Model
{
    use HasFactory;

    protected $table = 'user_added_peripherals';

    protected $fillable = [
        'peripheral_code',
        'type',
        'brand',
        'model',
        'serial_number',
        'condition',
        'room_id',
        'unit_id',
        'added_by',
    ];

    // Relationships
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function unit()
    {
        return $this->belongsTo(SystemUnit::class, 'unit_id');
    }

    public function addedBy()
    {
        return $this->belongsTo(User::class, 'added_by');
    }
}
