<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderStateChange;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderStateChangeController extends Controller
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
    public function store(Request $request, string $store_id, string $order_id)
    {
        //$this->authorize("create", OrderDocument::class);

        $validation_rules = [
            'state_id' => 'required',
            'date' => 'required',
            'time' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = [
                'status' => false,
                'message' => 'Error de validación.',
                'type_error' => 'validation-error',
                'errors' => $validation->errors(),
            ];

            return response()->json($response);
        }

        $order = Order::find($order_id);

        OrderStateChange::updateOrCreate(
            [
                'order_id' => $order_id,
                'state_id2' => $request->state_id],
            [
                'date' => $request->date('date'),
                'time' => $request->time,
                'state_id' => 1,
            ]
        );

        if ($order->state_id < $request->state_id) {
            $order->update([
                'state_id' => $request->state_id,
            ]);
        }

        $response = ['status' => true, 'message' => "Registro creado exitosamente."];

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
        //
    }

    public function update_state(Request $request, string $store_id, string $order_id, string $order_state_change_id)
    {
        $order_state_change = OrderStateChange::find($order_state_change_id);
        //$this->authorize("update", $order);

        if (!$order_state_change) {
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

        $order_state_change->update([
            'state_id' => $request->state_id,
        ]);

        $order = Order::find($order_id);

        if ($order_state_change->state_id2 == $order->state_id && $request->state_id == 2) {
            $previous_order_state_change = OrderStateChange::leftJoin('states', 'order_state_changes.state_id2', 'states.id')
                ->where('order_id', $order_id)->where('state_id', 1)
                ->orderBy('states.order', 'DESC')
                ->select('order_state_changes.*')
                ->first();

            $order->update([
                'state_id' => $previous_order_state_change->state_id2,
            ]);
        }

        $response = ['status' => true, 'message' => 'Registro actualizado exitosamente.'];

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
