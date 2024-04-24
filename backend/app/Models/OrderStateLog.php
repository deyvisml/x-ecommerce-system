<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStateLog extends Model
{
    use HasFactory;

    protected $table = 'order_state_logs';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'order_state_id',
        'order_id',
        'state_id2',
        'date',
        'time',
        'creator_id',
        'state_id',
        'updater_id',
    ];

    const UPDATED_AT = null;
}
