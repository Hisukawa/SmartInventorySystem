<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     * Add 'webauthn_key' here.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'active_room_id',

    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     * Cast 'webauthn_key' to 'array' so Laravel handles JSON encoding/decoding automatically.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',

    ];

    /**
     * Relationship with WebAuthn credentials (Currently simplified to a single JSON field).
     * If you later move to a separate `webauthn_credentials` table,
     * this section would be updated with a proper `hasMany` relationship.
     */

    public function webauthnCredentials()
{
    return $this->hasMany(WebauthnCredential::class);
}


}
