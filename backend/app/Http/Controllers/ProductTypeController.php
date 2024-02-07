<?php

namespace App\Http\Controllers;


use App\Models\ProductType;
use Illuminate\Http\Request;
use App\Http\Resources\ProductTypeResource;

class ProductTypeController extends Controller
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

    public function product_types_by_category(Request $request, string $category_id)
    {
        $order = $request->query('order');
        $limit = $request->query('limit');

        $product_types = ProductType::where('category_id', $category_id)->where('state_id', 1)->orderBy('order', 'ASC');

        if($order)
        {
            $product_types = $product_types->orderBy('name', $order);
        }

        $product_types = $product_types->get();

        return ProductTypeResource::collection($product_types);
    }
}
