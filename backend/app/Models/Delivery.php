<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;

    protected $table = 'deliveries';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'address',
        'address_reference',
        'date',
        'delivery_schedule_id',
        'region_id',
        'location_id',
        'cost',
        'phone_number',
    ];
}
