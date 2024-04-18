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
        'customer_id',
        'store_id',
        'state_id',
    ];

    public function cart()
    {
        $cart = $this->hasOne(Cart::class);
        return $cart;
    }

    public function cart_products()
    {
        $cart_products = $this->hasManyThrough(CartProduct::class, Cart::class);
        return $cart_products;
    }

    public function order_state_changes()
    {
        $order_state_changes = $this->hasMany(OrderStateChange::class)->where('state_id', 1);
        return $order_state_changes;
    }

    public function order_documents()
    {
        $order_documents = $this->hasMany(OrderDocument::class)->where('state_id', 1);
        return $order_documents;
    }
}
