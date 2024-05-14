<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderState;
use App\Models\State;
use App\Models\Store;
use Carbon\Carbon;
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
        $this->authorize("create", OrderState::class);

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

        $date = $request->date;
        $time = $request->time;
        $state_id2 = $request->state_id;

        $state2 = State::find($state_id2);

        $prev_state_id2 = OrderState::leftJoin('states', 'order_state.state_id2', '=', 'states.id')
            ->where('order_state.order_id', $order_id)
            ->where('order_state.state_id', 1)
            ->where('states.order', '<', $state2->order)
            ->orderBy('states.order', 'DESC')->first();

        $next_state_id2 = OrderState::leftJoin('states', 'order_state.state_id2', '=', 'states.id')
            ->where('order_state.order_id', $order_id)
            ->where('order_state.state_id', 1)
            ->where('states.order', '>', $state2->order)
            ->orderBy('states.order', 'ASC')->first();

        if ($prev_state_id2) {
            $date_time1 = $prev_state_id2->date . ' ' . $prev_state_id2->time;
            $date_time1 = Carbon::parse($date_time1);

            $date_time2 = substr($date, 0, 10) . ' ' . $time;
            $date_time2 = Carbon::parse($date_time2);

            if ($date_time2->lessThan($date_time1)) {
                $response = ['status' => false, 'message' => "La fecha y hora no deben de ser menores al estado previo establecido.", 'data' => $prev_state_id2];
                return response()->json($response);
            }
        }

        if ($next_state_id2) {
            $date_time1 = $next_state_id2->date . ' ' . $next_state_id2->time;
            $date_time1 = Carbon::parse($date_time1);

            $date_time2 = substr($date, 0, 10) . ' ' . $time;
            $date_time2 = Carbon::parse($date_time2);

            if ($date_time2->greaterThan($date_time1)) {
                $response = ['status' => false, 'message' => "La fecha y hora no deben de ser mayores al estado posterior establecido.", 'data' => $prev_state_id2];
                return response()->json($response);
            }
        }

        $order = Order::find($order_id);

        if ($order->state_id < $request->state_id) {
            $order->update([
                'updater_id' => $request->user()->id,
                'state_id' => $request->state_id,
            ]);
        }

        $order_state = OrderState::firstOrNew(
            [
                'order_id' => $order_id,
                'state_id2' => $request->state_id,
            ],
            [
                'date' => $request->date('date'),
                'time' => $request->time,
                'creator_id' => $request->user()->id,
                'updater_id' => $request->user()->id,
                'state_id' => 1,
            ]
        );

        if ($order_state->exists) {
            $order_state->date = $request->date('date');
            $order_state->time = $request->time;
            $order_state->updater_id = $request->user()->id;
            $order_state->state_id = 1; // active
        }

        $order_state->save();

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
        $this->authorize("update", [$order_state, Store::find($store_id), Order::find($order_id)]);

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
                ->where('order_state.id', '<>', $order_state_id)
                ->orderBy('states.order', 'DESC')
                ->select('order_state.*')
                ->first();

            $order->update([
                'state_id' => $previous_order_state->state_id2,
            ]);
        }

        $order_state->update([
            'state_id' => $request->state_id,
            'updater_id' => $request->user()->id,
        ]);

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
