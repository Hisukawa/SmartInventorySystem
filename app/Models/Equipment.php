<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipments';

    protected $fillable = [
        'equipment_code',
        'type',
        'brand',
        'condition',
        'room_number',
    ];

    // If you have a Room model
    public function room()
    {
        return $this->belongsTo(Room::class, 'room_number', 'room_number');
    }

     public static function availableConditions(){

        return static::select('condition')->distinct()->pluck('condition');
    }
}
