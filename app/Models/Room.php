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
    'status',
    'is_active',
    'last_scanned_by',
    'last_scanned_at',
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


        public function faculties()
        {
            return $this->hasMany(User::class, 'active_room_id') // foreign key
                        ->where('role', 'faculty');
        }


public function lastScannedUser()
{
    return $this->belongsTo(User::class, 'last_scanned_by');
}



}
