<?php

namespace App\Http\Controllers;

use App\Mail\OrderConfirmationMail;
use App\Models\Cart;
use App\Models\CartProduct;
use App\Models\Delivery;
use App\Models\Location;
use App\Models\Order;
use App\Models\Product;
use App\Models\Region;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function send_order_confirmation_mail(Request $request)
    {
        $order_id = $request->input('order_id');
        $order = Order::find($order_id);
        $user = User::find($order->user_id);
        $delivery = Delivery::find($order->delivery_id);
        $cart = Cart::find($order->cart_id);
        $cart_product = CartProduct::where('cart_id', $cart->id)->get();

        $delivery_full = array();
        $delivery_full['delivery'] = $delivery;
        $delivery_full['region'] = Region::find($delivery->region_id);
        $delivery_full['location'] = Location::find($delivery->location_id);

        $cart_products = array();
        foreach ($cart_product as $i => $cart_product_i) {
            $cart_products[$i] = array();
            $cart_products[$i]['cart_product'] = $cart_product_i;

            $product = Product::find($cart_product_i->product_id);

            $cart_products[$i]['product'] = $product;
        }

        Mail::to($user->email)->send(new OrderConfirmationMail($user, $order, $delivery_full, $cart, $cart_products));

        return "Email sent successfully!";
    }
}
