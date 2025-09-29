<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipment_name',
        'component',
        'action',
        'old_value',
        'new_value',
        'room_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
