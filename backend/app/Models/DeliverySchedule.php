<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliverySchedule extends Model
{
    use HasFactory;

    protected $table = 'delivery_schedules';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'start_hour',
        'end_hour',
        'creator_id',
        'updater_id',
        'state_id',
    ];
}
