<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordRecoveryRequest extends Model
{
    use HasFactory;

    protected $table = 'password_recovery_requests';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'token',
        'url',
        'user_id',
        'state_id',
    ];
}
