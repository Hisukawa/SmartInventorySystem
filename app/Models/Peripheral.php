<?php

// app/Models/Peripheral.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Peripheral extends Model
{
    protected $fillable = [
        'peripheral_code',
        'type',
        'brand',
        'model',
        'serial_number',
        'condition',
        'room_id',  // if applicable
        'unit_id',
        'qr_code_path',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function unit()
    {
        return $this->belongsTo(SystemUnit::class);
    }

    public static function availableConditions(){

        return static::select('condition')->distinct()->pluck('condition');
    }

      public function mr_to(){
         return $this->belongsTo(User::class, 'mr_id');

    }
}

