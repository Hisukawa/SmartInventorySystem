<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomStatus extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'room_id',
        'scanned_by',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /*
    function for Relationship for room and users
    */

    public function room(){
        return $this->belongsTo(Room::class, 'room_id');
    }


    public function scannedBy(){
        return $this->belongsTo(User::class, 'scanned_by');
    }
 public function faculty()
    {
        return $this->belongsTo(User::class, 'scanned_by');
    }

}
