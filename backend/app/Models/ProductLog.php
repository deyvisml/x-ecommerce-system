<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductLog extends Model
{
    use HasFactory;

    protected $table = 'product_logs';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'product_id',
        'name',
        'sku',
        'description',
        'image_names',
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
        'store_id',
        'creator_id',
        'state_id',
        'updater_id',
    ];

    const UPDATED_AT = null; // disabled updated_at
}
