<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $product_type_id = $request->query('product_type_id');
        $order = $request->query('order');
        $limit = $request->query('limit');

        $products = Product::where('state_id', 1);

        if($product_type_id)
        {
            $products = $products->where('product_type_id', $product_type_id);
        }
        if($order)
        {
            $products = $products->orderBy('name', $order);
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
    public function show(string $id)
    {
        //
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
}
