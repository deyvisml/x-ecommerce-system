<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationResource;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $order = $request->query('order');
        $limit = $request->query('limit');

        $locations = Location::where('state_id', 1);

        if ($order) {
            $locations = $locations->orderBy('name', $order);
        }
        if ($limit) {
            $locations = $locations->limit($limit);
        }

        $locations = $locations->get();

        return LocationResource::collection($locations);
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

    public function locations_by_region(Request $request, string $region_id)
    {
        $order = $request->query('order');
        $limit = $request->query('limit');

        $products = Location::where('region_id', $region_id)->where('state_id', 1);

        if ($order) {
            $products = $products->orderBy('name', $order);
        }
        if ($limit) {
            $products = $products->limit($limit);
        }

        $products = $products->get();

        return LocationResource::collection($products);
    }
}
