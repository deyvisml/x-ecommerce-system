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
        'collection_id',
        'category_id',
        'user_id',
        'state_id',
    ];
}
