<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryScheduleLog extends Model
{
    use HasFactory;

    protected $table = 'delivery_schedule_logs';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'delivery_schedule_id',
        'start_hour',
        'end_hour',
        'creator_id',
        'state_id',
        'updater_id',
    ];
}
