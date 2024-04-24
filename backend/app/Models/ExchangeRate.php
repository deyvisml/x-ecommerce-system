<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
    use HasFactory;

    protected $table = 'exchange_rates';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'currency',
        'price',
        'creator_id',
        'updater_id',
        'state_id',
    ];
}
