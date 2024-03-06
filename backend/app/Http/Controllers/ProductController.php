<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $product_type_id = $request->query('product_type_id');
        $order_by_name = $request->query('order_by_name');
        $order_by_direction = $request->query('order_by_direction') ?? 'ASC';
        $limit = $request->query('limit');

        return response()->json(["order_by_name" => $order_by_name, "order_by_direction" => $order_by_direction]);

        $products = Product::where('state_id', 1);

        if ($product_type_id) {
            $products = $products->where('product_type_id', $product_type_id);
        }
        if ($order_by_name) {
            $products = $products->orderBy($order_by_name, $order_by_direction);
        }

        $products = $products->get();

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $product_id)
    {
        $product = Product::where('id', $product_id)->where('state_id', 1);
        $product = $product->first();

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function products_by_category(Request $request, string $category_id)
    {
        $product_type_id = $request->query('product_type_id');
        $exclude_product_id = $request->query('exclude_product_id');
        $order_by_name = $request->query('order_by_name');
        $order_by_direction = $request->query('order_by_direction') ?? 'ASC';
        $limit = $request->query('limit');

        $products = Product::where('category_id', $category_id)->where('state_id', 1);

        if ($product_type_id) {
            $products = $products->where('product_type_id', $product_type_id);
        }
        if ($exclude_product_id) {
            $products = $products->where('id', '<>', $exclude_product_id);
        }
        if ($order_by_name) {
            if ($order_by_name == "random") {
                $products = $products->inRandomOrder();
            } else {
                $products = $products->orderBy($order_by_name, $order_by_direction);
            }
        }
        if ($limit) {
            $products = $products->limit($limit);
        }

        $products = $products->get();

        return ProductResource::collection($products);
    }
}
