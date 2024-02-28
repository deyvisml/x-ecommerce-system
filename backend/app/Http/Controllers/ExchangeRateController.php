<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExchangeRateResource;
use App\Models\ExchangeRate;
use Illuminate\Http\Request;

class ExchangeRateController extends Controller
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
    public function show(string $exchange_rate_id)
    {
        $exchange_rate = ExchangeRate::where('id', $exchange_rate_id)->where('state_id', 1);
        $exchange_rate = $exchange_rate->first();

        return new ExchangeRateResource($exchange_rate);
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
