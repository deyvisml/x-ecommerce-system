<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $table = 'locations';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'name',
        'delivery_cost',
        'region_id',
        'creator_id',
        'updater_id',
        'state_id',
    ];
}
