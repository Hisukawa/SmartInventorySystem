<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemUnitHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'system_unit_id',
        'user_id',
        'user_name',
        'action',
        'component',
        'old_value',
        'new_value',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function systemUnit()
    {
        return $this->belongsTo(SystemUnit::class);
    }
}
