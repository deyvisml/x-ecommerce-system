<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'name',
        'sku',
        'description',
        'image_name',
        'price',
        'discount_rate',
        'offer_price',
        'in_offer',
        'quantity',
        'in_stock',
        'min_quantity_buy',
        'max_quantity_buy',
        'product_type_id',
        'category_id',
        'seller_id',
        'state_id',
    ];
}
