<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebauthnCredential extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'credential_id',
        'public_key',
        'counter',
        'transports',
        'attestation_type',
        'aaguid',
        'trust_path',
        'user_handle',
    ];

    protected $casts = [
        'trust_path' => 'array',
        'user_handle' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
