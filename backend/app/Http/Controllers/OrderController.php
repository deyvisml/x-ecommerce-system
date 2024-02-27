<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\Location;
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
        

        $document_type = $request->input('document_type');
        $document_number = $request->input('document_number');
        $first_name = $request->input('first_name');
        $last_name = $request->input('birthdate');
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
        $delivery_hour = $request->input('delivery_hour');
        $delivery_phone_number = $request->input('delivery_phone_number');

        $payment_method = $request->input('payment_method');

        $privacy_policies = $request->input('privacy_policies');
        $terms_service = $request->input('terms_service');
        $subscribe_newsletter = $request->input('subscribe_newsletter');

        $user = User::updateOrCreate([
            'email' => $email,
        ],[
            'document_type_id' => $document_type,
            'document_number' => $document_number,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'birthdate' => $birthdate,
            'phone_number' => $phone_number,
            'subscribe_newsletter' => $subscribe_newsletter,
        ]);

        $location = Location::find($delivery_location);

        $delivery = Delivery::create([
            'first_name' => $delivery_first_name,
            'last_name' => $delivery_last_name,
            'address' => $delivery_address,
            'address_reference' => $delivery_address_reference,
            'date' => $delivery_date,
            'schedule_id' => $delivery_hour,
            'region_id' => $delivery_region,
            'location_id' => $delivery_location,
            'cost' => $location->delivery_cost,
            'phone_number' => $delivery_phone_number,
        ]);



        return response()->json($user->id);

        dd($document_type,
        $document_number,
        $first_name,
        $last_name,
        $email,
        $birthdate,
        $phone_number);

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
