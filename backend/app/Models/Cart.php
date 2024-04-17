<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'carts';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'total_price',
        'order_id',
        'state_id',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'cart_product');
    }
}
