<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class UserAddedRooms extends Model
{
    use HasFactory;

    // Define the table if it doesn't follow Laravel's naming convention
    protected $table = 'user_added_rooms';

    // Fillable fields for mass assignment
    protected $fillable = [
        'room_number',
        'room_path',
        'added_by',
    ];

    // Optional: define relationship with User
    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }
}
