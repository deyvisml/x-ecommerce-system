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
        'product_log_id',
        'quantity',
        'state_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function product_log()
    {
        return $this->belongsTo(ProductLog::class);
    }
}
