<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemUnit extends Model
{
    use HasFactory;

    protected $table = 'system_units';

    protected $fillable = [
        'unit_code',
        'processor',
        'ram',
        'storage',
        'gpu',
        'motherboard',
        'serial_number',
        'condition',
        'condition_details',
        'room_id',
        'mr_id',
        'unit_path',
    ];

    protected $casts = [
        'mr_id' => 'integer',
    ];


    public function room()
    {
        return $this->belongsTo(Room::class);
    }

  public function peripherals()
    {
        return $this->hasMany(Peripheral::class, 'unit_id');
    }

    public static function availableConditions(){

        return static::select('condition')->distinct()->pluck('condition');
    }

    public function mr_to(){
        return $this->belongsTo(User::class, 'mr_id');

    }
}
