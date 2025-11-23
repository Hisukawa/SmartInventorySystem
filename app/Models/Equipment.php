<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipments';

    protected $fillable = [
        'equipment_code',
        'equipment_name',
        'type',
        'brand',
        'condition',
        'room_id',
        'qr_code',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id', 'id');
    }

    public static function availableConditions(){

        return static::select('condition')->distinct()->pluck('condition');
    }

    public function getRouteKeyName()
    {
        if (
            request()->routeIs('faculty.*') ||
            request()->routeIs('guest.*') ||
            request()->routeIs('technician.*') // 👈 added this
        ) {
            return 'id';
        }

        if (request()->routeIs('admin.*')) {
            return 'equipment_code';
        }

        return 'equipment_code'; // Admin
    }

    public function mr_to(){
        return $this->belongsTo(User::class, 'mr_id');

    }


}
