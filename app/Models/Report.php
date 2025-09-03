<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'reportable_type',
        'reportable_id',
        'room_id',
        'user_id',
        'condition',

        'remarks',
        'photo_path',
    ];

    /**
     * Polymorphic relation: Report belongs to either SystemUnit, Peripheral, or Equipment
     */
    public function reportable()
    {
        return $this->morphTo();
    }

    /**
     * Report is created by a Faculty/User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Report is for a specific room
     */
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

}
