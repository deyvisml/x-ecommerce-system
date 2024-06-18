<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\CartProduct;
use App\Models\Delivery;
use App\Models\DeliveryScheduleLog;
use App\Models\ExchangeRateLog;
use App\Models\Location;
use App\Models\LocationLog;
use App\Models\Order;
use App\Models\OrderState;
use App\Models\Product;
use App\Models\ProductLog;
use App\Models\Store;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filtering = $request->query('filtering');
        $excluding = $request->query('excluding');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        // ------------------ query ------------------
        $query = Order::query();

        // ------------------ select columns ------------------
        $query->select('orders.*');
        foreach (Schema::getColumnListing('deliveries') as $column) {
            $query->addSelect('deliveries.' . $column . ' as deliveries_' . $column);
        }
        foreach (Schema::getColumnListing('users') as $column) {
            $query->addSelect('users.' . $column . ' as users_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('deliveries', 'orders.delivery_id', '=', 'deliveries.id');
        $query->leftJoin('users', 'orders.customer_id', '=', 'users.id');
        $query->leftJoin('states', 'orders.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        if ($filtering) {
            foreach ($filtering as $filter) {
                if (isset($filter['values'])) {
                    $query->whereIn($filter['column'], $filter['values']);
                }
            }
        }
        if ($excluding) {
            foreach ($excluding as $exclude) {
                if (isset($exclude['values'])) {
                    $query->whereNotIn($exclude['column'], $exclude['values']);
                }
            }
        }
        if ($search_query) {
            $query->where(function ($query) use ($search_query) {
                $columns = ['orders.id', 'orders.created_at', 'users.first_name', 'users.last_name', 'orders.payment_method', 'orders.total_price', 'states.name'];

                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            });
        }
        if ($sorting) {
            foreach ($sorting as $sort) {
                if ($sort['way'] == 'random') {
                    $query->inRandomOrder();
                } else {
                    $query->orderBy($sort['column'], $sort['way']);
                }
            }
        } else {
            $query->orderBy('orders.id', 'ASC'); // IMPORTANT (solver order), some methods like whereIn loses the "default order" (by id)
        }

        if ($limit) {
            $query->limit($limit);
        }

        // ------------------ form data ------------------
        if ($page_size) {
            $orders = $query->paginate($page_size);
        } else {
            $orders = $query->get();
        }

        return OrderResource::collection($orders);
    }

    // store is not save, it means a place where you can buy
    public function store_orders(Request $request, string $store_id)
    {
        $store = Store::find($store_id);
        $this->authorize("viewAll", [Order::class, $store]);

        $filtering = $request->query('filtering');
        $excluding = $request->query('excluding');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        // ------------------ query ------------------
        $query = Order::query();

        // ------------------ select columns ------------------
        $query->select('orders.*');
        foreach (Schema::getColumnListing('deliveries') as $column) {
            $query->addSelect('deliveries.' . $column . ' as deliveries_' . $column);
        }
        foreach (Schema::getColumnListing('users') as $column) {
            $query->addSelect('users.' . $column . ' as users_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('deliveries', 'orders.delivery_id', '=', 'deliveries.id');
        $query->leftJoin('users', 'orders.customer_id', '=', 'users.id');
        $query->leftJoin('states', 'orders.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        if ($filtering) {
            foreach ($filtering as $filter) {
                if (isset($filter['values'])) {
                    $query->whereIn($filter['column'], $filter['values']);
                }
            }
        }
        if ($excluding) {
            foreach ($excluding as $exclude) {
                if (isset($exclude['values'])) {
                    $query->whereNotIn($exclude['column'], $exclude['values']);
                }
            }
        }
        if ($search_query) {
            $query->where(function ($query) use ($search_query) {
                $columns = ['orders.id', 'orders.created_at', 'users.first_name', 'users.last_name', 'orders.payment_method', 'orders.total_price', 'states.name'];

                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            });
        }

        $query->where('orders.store_id', $store->id);

        if ($sorting) {
            foreach ($sorting as $sort) {
                if ($sort['way'] == 'random') {
                    $query->inRandomOrder();
                } else {
                    $query->orderBy($sort['column'], $sort['way']);
                }
            }
        } else {
            $query->orderBy('orders.id', 'ASC'); // IMPORTANT (solver order), some methods like whereIn loses the "default order" (by id)
        }

        if ($limit) {
            $query->limit($limit);
        }

        // ------------------ form data ------------------
        if ($page_size) {
            $orders = $query->paginate($page_size)->onEachSide(1);
        } else {
            $orders = $query->get();
        }

        return OrderResource::collection($orders);
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
        $birthdate = $request->date('birthdate');
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
            'delivery_schedule_log_id' => DeliveryScheduleLog::where('delivery_schedule_id', $delivery_schedule)->latest()->first()->id,
            'location_id' => $delivery_location,
            'location_log_id' => LocationLog::where('location_id', $delivery_location)->latest()->first()->id,
            'region_id' => $delivery_region,
            'phone_number' => $delivery_phone_number,
        ]);

        // calculate total price of all products in the cart
        $total_price_products = 0;
        foreach ($cart['items'] as $item) {
            $product = $item['product'];
            $total_price_products += ($product['in_offer'] ? $product['offer_price'] : $product['price']) * $item['quantity'];
        }

        $created_order = Order::create([
            'payment_method' => $payment_method,
            'total_price' => $total_price_products + $location->delivery_cost,
            'usd_total_price' => $usd_total_price,
            'paid' => false,
            'exchange_rate_log_id' => ExchangeRateLog::where('exchange_rate_id', 1)->latest()->first()->id,
            'email_sent' => false,
            'delivery_id' => $created_delivery->id,
            'customer_id' => $created_user->id,
            'store_id' => Product::find($cart['items'][0]['product']['id'])->store_id,
            'creator_id' => $created_user->id,
            'updater_id' => $created_user->id,
            'state_id' => 11, // not paid
        ]);

        $created_cart = Cart::create([
            'total_price' => $total_price_products,
            'order_id' => $created_order->id,
        ]);

        // save cart product relation in cart_product table
        foreach ($cart['items'] as $item) {
            CartProduct::create([
                'cart_id' => $created_cart->id,
                'product_id' => $item['product']['id'],
                'product_log_id' => ProductLog::where('product_id', $item['product']['id'])->latest()->first()->id,
                'quantity' => $item['quantity'],
            ]);
        }

        $response = ['error_occurred' => false, 'message' => 'Order created successfully', 'data' => ['order_id' => $created_order->id]];

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $order_id)
    {

    }

    // store is not save, in this context means a place where you can buy
    public function store_order(string $store_id, string $order_id)
    {
        $this->authorize("view_store_order", [Order::find($order_id), Store::find($store_id)]);

        $query = Order::query();

        // ------------------ select columns ------------------
        $query->select('orders.*');
        foreach (Schema::getColumnListing('exchange_rate_logs') as $column) {
            $query->addSelect('exchange_rate_logs.' . $column . ' as exchange_rate_logs_' . $column);
        }
        foreach (Schema::getColumnListing('deliveries') as $column) {
            $query->addSelect('deliveries.' . $column . ' as deliveries_' . $column);
        }
        foreach (Schema::getColumnListing('delivery_schedule_logs') as $column) {
            $query->addSelect('delivery_schedule_logs.' . $column . ' as delivery_schedule_logs_' . $column);
        }
        foreach (Schema::getColumnListing('location_logs') as $column) {
            $query->addSelect('location_logs.' . $column . ' as location_logs_' . $column);
        }
        foreach (Schema::getColumnListing('regions') as $column) {
            $query->addSelect('regions.' . $column . ' as regions_' . $column);
        }
        foreach (Schema::getColumnListing('users') as $column) {
            $query->addSelect('users.' . $column . ' as customers_' . $column);
        }
        foreach (Schema::getColumnListing('stores') as $column) {
            $query->addSelect('stores.' . $column . ' as stores_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('exchange_rate_logs', 'orders.exchange_rate_log_id', '=', 'exchange_rate_logs.id');
        $query->leftJoin('deliveries', 'orders.delivery_id', '=', 'deliveries.id');
        $query->leftJoin('delivery_schedule_logs', 'deliveries.delivery_schedule_log_id', '=', 'delivery_schedule_logs.id');
        $query->leftJoin('location_logs', 'deliveries.location_log_id', '=', 'location_logs.id');
        $query->leftJoin('regions', 'deliveries.region_id', '=', 'regions.id');
        $query->leftJoin('users', 'orders.customer_id', '=', 'users.id');
        $query->leftJoin('stores', 'orders.store_id', '=', 'stores.id');
        $query->leftJoin('states', 'orders.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        $query->where('orders.id', $order_id);

        $order = $query->first();

        // get cart
        $order->cart;

        // get cart_products
        $cart_products = $order->cart_products;

        foreach ($cart_products as $cart_product) {
            $cart_product->product_log;
        }

        // get order_state
        $order_state = $order->order_state;

        foreach ($order_state as $order_state_i) {
            $order_state_i->state2;
            $order_state_i->updater;
        }

        // get order_documents
        $order_documents = $order->order_documents;

        foreach ($order_documents as $order_document) {
            $order_document->state;
        }

        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

    }

    public function update_state_to_paid(string $order_id)
    {
        $order = Order::find($order_id);

        if (!$order) {
            $response = ['status' => false, 'message' => 'No se encontró ningun registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $paid_state_id = 12;

        // update product stock
        try {
            $cart_products = $order->cart_products;
            $cart_product = $cart_products[0];
            $product_id = $cart_product->product_id;
            $quantity = $cart_product->quantity;
            $product = Product::find($product_id);
            $product->update(["quantity" => $product->quantity - $quantity]);
        } catch (\Throwable $e) {
            $response = ['status' => false, 'message' => 'Error en la obtención del producto.'];
            return response()->json($response);
        }

        $order->update([
            'paid' => true,
            'state_id' => $paid_state_id,
        ]);

        OrderState::create([
            'order_id' => $order_id,
            'state_id2' => $paid_state_id,
            'date' => Carbon::now()->format('Y-m-d'),
            'time' => Carbon::now()->format('H:i:s'),
            'creator_id' => $order->customer_id,
            'updater_id' => $order->customer_id,
            'state_id' => 1,
        ]);

        $response = ['error_occurred' => false, 'message' => 'Registro actualizado exitosamente.'];

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $store_id, string $order_id)
    {
        $order = Order::find($order_id);
        $this->authorize("delete", [$order, Store::find($store_id)]);

        if (!$order) {
            $response = ['status' => false, 'message' => 'No se encontró ningún registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $deleted_state_id = 3;

        $order->update([
            'state_id' => $deleted_state_id,
        ]);

        OrderState::updateOrCreate([
            'order_id' => $order_id,
            'state_id2' => $deleted_state_id,
        ], [
            'date' => Carbon::now()->toDateString(),
            'time' => Carbon::now()->toTimeString(),
            'state_id' => 1,
        ]);

        $response = ['status' => true, 'message' => 'Registro eliminado exitosamente.'];

        return response()->json($response);
    }

    public function update_state(Request $request, string $store_id, string $order_id)
    {
        $order = Order::find($order_id);
        $this->authorize("update", [$order, Store::find($store_id)]);

        if (!$order) {
            $response = ['status' => false, 'message' => 'No se encontró ningún registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $validation_rules = [
            'state_id' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = ['status' => false, 'message' => 'Error de validación.', 'errors' => $validation->errors()];
            return response()->json($response);
        }

        $order->update([
            'state_id' => $request->state_id,
        ]);

        $response = ['status' => true, 'message' => 'Registro actualizado exitosamente.'];

        return response()->json($response);
    }
}
