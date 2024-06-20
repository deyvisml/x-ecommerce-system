<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOccasion;
use Illuminate\Http\Request;

class PurchaseOccasionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $purchase_occasions = PurchaseOccasion::all();

        foreach ($purchase_occasions as $purchase_occasion) {
            $purchase_occasion->dedication_messages;
        }

        $response = [
            "message" => "Records retrieved successfuly.",
            "data" => $purchase_occasions,
            "status" => true,
        ];

        return response()->json($response, 200);
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
