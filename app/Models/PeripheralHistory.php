<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeripheralHistory extends Model
{
    protected $fillable = [
        'user_id',
        'peripheral_id',
        'peripheral_code',
        'unit_id',
        'room_id',
        'action',
        'component',
        'old_value',
        'new_value',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function peripheral()
    {
        return $this->belongsTo(Peripheral::class);
    }

    public function unit()
    {
        return $this->belongsTo(SystemUnit::class, 'unit_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
