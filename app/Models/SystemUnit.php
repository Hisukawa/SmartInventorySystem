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
        'condition',
        'room_id',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
