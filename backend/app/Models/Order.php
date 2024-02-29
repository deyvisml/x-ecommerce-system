<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'payment_method',
        'total_price',
        'usd_total_price',
        'paid',
        'usd_amount_paid',
        'email_sent',
        'delivery_id',
        'cart_id',
        'user_id',
        'state_id',
    ];
}
