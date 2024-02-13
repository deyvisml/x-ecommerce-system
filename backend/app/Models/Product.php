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
        'description',
        'image_url',
        'price',
        'quantity',
        'has_stock',
        'product_type_id',
        'category_id',
        'state_id',
    ];
}
