<?php

namespace App\Http\Controllers;

use App\Http\Resources\DeliveryScheduleResource;
use App\Models\DeliverySchedule;
use Illuminate\Http\Request;

class DeliveryScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $difference_time = $request->query('difference_time');
        $order_by_name = $request->query('order_by_name');
        $order_by_direction = $request->query('order_by_direction') ?? 'ASC';
        $limit = $request->query('limit');

        $delivery_schedules = DeliverySchedule::where('state_id', 1);

        if ($difference_time) {

            $current_hour = date("H:i:s");

            // Convertir la hora actual y la hora a agregar a segundos
            $current_hour_seconds = strtotime($current_hour);
            $difference_time_seconds = strtotime($difference_time);

            // Sumar los segundos
            $current_hour_plus_difference_time_seconds = $current_hour_seconds + $difference_time_seconds - strtotime('00:00:00'); // the strtotime('00:00:00') fixed the problem because the add was not correct without this part

            // Convertir los segundos nuevamente a formato de hora
            $current_hour_plus_difference_time = date("H:i:s", $current_hour_plus_difference_time_seconds);

            $delivery_schedules = $delivery_schedules->where('start_hour', '>', $current_hour_plus_difference_time);
        }
        if ($order_by_name) {
            if ($order_by_name == "random") {
                $delivery_schedules = $delivery_schedules->inRandomOrder();
            } else {
                $delivery_schedules = $delivery_schedules->orderBy($order_by_name, $order_by_direction);
            }
        }
        if ($limit) {
            $delivery_schedules = $delivery_schedules->limit($limit);
        }

        $delivery_schedules = $delivery_schedules->get();

        return DeliveryScheduleResource::collection($delivery_schedules);
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
