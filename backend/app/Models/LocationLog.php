<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocationLog extends Model
{
    use HasFactory;

    protected $table = 'location_logs';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'location_id',
        'name',
        'delivery_cost',
        'region_id',
        'creator_id',
        'state_id',
        'updater_id',
    ];

    const UPDATED_AT = null;
}
