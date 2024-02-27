<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartProduct extends Model
{
    use HasFactory;

    protected $table = 'cart_product';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'cart_id',
        'product_id',
        'quantity',
        'state_id',
    ];
}
