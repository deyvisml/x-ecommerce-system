<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderState;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderStateController extends Controller
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

        if ($order->state_id < $request->state_id) {
            // why only update order? because we have a trigger (observer), when the order is created or updated then we create or update a OrderState
            $order->update([
                'updater_id' => $request->user()->id,
                'state_id' => $request->state_id,
            ]);
        } else {
            $order_state = OrderState::firstOrNew(
                [
                    'order_id' => $order_id,
                    'state_id2' => $request->state_id,
                ],
                [
                    'date' => $request->date('date'),
                    'time' => $request->time,
                    'updater_id' => $request->user()->id,
                    'state_id' => 1,
                ]
            );

            // only if we are creating the recrod then set the creator_id as the current user id, in other case maintain the old value.
            if ($order_state->exists) {
                $order_state->state_id = 1; // active
            } else {
                $order_state->creator_id = $request->user()->id;
            }

            $order_state->save();
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

    public function update_state(Request $request, string $store_id, string $order_id, string $order_state_id)
    {
        $order_state = OrderState::find($order_state_id);
        //$this->authorize("update", $order);

        if (!$order_state) {
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

        $order = Order::find($order_id);

        if ($request->state_id == 2 && $order_state->state_id2 == $order->state_id) { // $request->state_id == 2 means inactive
            $previous_order_state = OrderState::leftJoin('states', 'order_state.state_id2', 'states.id')
                ->where('order_id', $order_id)
                ->where('state_id', 1)
                ->orderBy('states.order', 'DESC')
                ->select('order_state.*')
                ->first();

            $order->update([
                'state_id' => $previous_order_state ? $previous_order_state->state_id2 : 2,
            ]);
        } else {
            $order_state->update([
                'state_id' => $request->state_id,
                'updater_id' => $request->user()->id,
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
