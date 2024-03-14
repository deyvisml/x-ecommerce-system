<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartProduct;
use App\Models\Delivery;
use App\Models\Location;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cart = $request->input('cart');
        $usd_total_price = $request->input('usd_total_price');

        $document_type = $request->input('document_type');
        $document_number = $request->input('document_number');
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $email = $request->input('email');
        $birthdate = $request->input('birthdate');
        $phone_number = $request->input('phone_number');

        $delivery_first_name = $request->input('delivery_first_name');
        $delivery_last_name = $request->input('delivery_last_name');
        $delivery_region = $request->input('delivery_region');
        $delivery_location = $request->input('delivery_location');
        $delivery_address = $request->input('delivery_address');
        $delivery_address_reference = $request->input('delivery_address_reference');
        $delivery_date = $request->date('delivery_date');
        $delivery_schedule = $request->input('delivery_schedule');
        $delivery_phone_number = $request->input('delivery_phone_number');

        $payment_method = $request->input('payment_method');

        $privacy_policies = $request->input('privacy_policies');
        $terms_service = $request->input('terms_service');
        $subscribe_newsletter = $request->input('subscribe_newsletter');

        $created_user = User::updateOrCreate([
            'email' => $email,
        ], [
            'document_type_id' => $document_type,
            'document_number' => $document_number,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'birthdate' => $birthdate,
            'phone_number' => $phone_number,
            'subscribe_newsletter' => $subscribe_newsletter,
        ]);

        $location = Location::find($delivery_location);

        $created_delivery = Delivery::create([
            'first_name' => $delivery_first_name,
            'last_name' => $delivery_last_name,
            'address' => $delivery_address,
            'address_reference' => $delivery_address_reference,
            'date' => $delivery_date,
            'delivery_schedule_id' => $delivery_schedule,
            'region_id' => $delivery_region,
            'location_id' => $delivery_location,
            'cost' => $location->delivery_cost,
            'phone_number' => $delivery_phone_number,
        ]);

        // calculate total price of all products in the cart
        $total_price_products = 0;
        foreach ($cart['items'] as $item) {
            $product = $item['product'];
            $total_price_products += $product['price'] * $item['quantity'];
        }

        $created_cart = Cart::create([
            'total_price' => $total_price_products,
        ]);

        // save cart product relation in cart_product table
        foreach ($cart['items'] as $item) {
            CartProduct::create([
                'cart_id' => $created_cart->id,
                'product_id' => $item['product']['id'],
                'quantity' => $item['quantity'],
            ]);
        }

        $created_order = Order::create([
            'payment_method' => $payment_method,
            'total_price' => $total_price_products + $location->delivery_cost,
            'usd_total_price' => $usd_total_price,
            'paid' => false,
            'email_sent' => false,
            'delivery_id' => $created_delivery->id,
            'cart_id' => $created_cart->id,
            'user_id' => $created_user->id,
        ]);

        $response = ['error_occurred' => false, 'message' => 'Order created successfully', 'data' => ['order_id' => $created_order->id]];

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data_to_update = $request->all();

        $order = Order::find($id);
        $order->update($data_to_update);

        $response = ['error_occurred' => false, 'message' => 'Order updated sucessfully'];

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
