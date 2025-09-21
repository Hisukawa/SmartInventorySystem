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
        if (request()->routeIs('faculty.*')) {
            return 'id'; // Faculty uses primary key
        }

        return 'equipment_code'; // Admin uses equipment_code
    }



}
