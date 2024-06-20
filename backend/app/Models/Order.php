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
        'exchange_rate_log_id',
        'email_sent',
        'delivery_id',
        'customer_id',
        'store_id',
        'purchase_occasion_id',
        'no_send_message_card',
        'dedication_message_id',
        'dedication_message',
        'creator_id',
        'updater_id',
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

    public function order_state()
    {
        $order_state = $this->hasMany(OrderState::class)->leftJoin('states as states2', 'order_state.state_id2', 'states2.id')
            ->where('order_state.state_id', 1)
            ->select('order_state.*')
            ->orderBy('states2.order', 'ASC');

        return $order_state;
    }

    public function order_documents()
    {
        $order_documents = $this->hasMany(OrderDocument::class)->where('state_id', 1);
        return $order_documents;
    }
}
