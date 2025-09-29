<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'message',
        'room_id',
        'scheduled_date',
        'created_by',
    ];

    // Relations
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    
}
