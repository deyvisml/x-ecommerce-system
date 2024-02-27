<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'total_price',
        'payment_method',
        'paid',
        'email_sent',
        'delivery_id',
        'cart_id',
        'user_id',
        'state_id',
    ];
}
