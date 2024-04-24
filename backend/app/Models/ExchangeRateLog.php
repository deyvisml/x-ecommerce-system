<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeRateLog extends Model
{
    use HasFactory;

    protected $table = 'exchange_rate_logs';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'exchange_rate_id',
        'currency',
        'price',
        'creator_id',
        'state_id',
        'updater_id',
    ];

    const UPDATED_AT = null;
}
