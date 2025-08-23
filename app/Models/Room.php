<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_number',
        'room_path',
    ];

    // A room has many system units
    public function systemUnits()
    {
        return $this->hasMany(SystemUnit::class);
    }

    // A room has many peripherals
    public function peripherals()
    {
        return $this->hasMany(Peripheral::class);
    }

    // A room has many equipments
    public function equipments()
    {
        return $this->hasMany(Equipment::class);
    }
}
