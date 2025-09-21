<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_name',
        'role',
        'action',
        'old_value',
        'new_value',
    ];

    // Relation to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
