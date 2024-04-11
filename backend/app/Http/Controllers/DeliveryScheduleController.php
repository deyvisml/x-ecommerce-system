<?php

namespace App\Http\Controllers;

use App\Http\Resources\DeliveryScheduleResource;
use App\Models\DeliverySchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

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

    public function index2(Request $request)
    {
        $filtering = $request->query('filtering');
        $excluding = $request->query('excluding');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        // ------------------ query ------------------
        $query = DeliverySchedule::query();

        // ------------------ select columns ------------------
        $query->select('delivery_schedules.*');

        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('states', 'delivery_schedules.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        if ($filtering) {
            foreach ($filtering as $filter) {
                if (isset($filter['values'])) {
                    $query->whereIn($filter['column'], $filter['values']);
                }
            }
        }
        if ($excluding) {
            foreach ($excluding as $exclude) {
                if (isset($exclude['values'])) {
                    $query->whereNotIn($exclude['column'], $exclude['values']);
                }
            }
        }
        if ($search_query) {
            $query->where(function ($query) use ($search_query) {
                $columns = ['delivery_schedules.id', 'states.name'];

                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            });
        }
        if ($sorting) {
            foreach ($sorting as $sort) {
                if ($sort['way'] == 'random') {
                    $query->inRandomOrder();
                } else {
                    $query->orderBy($sort['column'], $sort['way']);
                }
            }
        } else {
            $query->orderBy('delivery_schedules.id', 'ASC'); // IMPORTANT (solver order), some methods like whereIn loses the "default order" (by id)
        }

        if ($limit) {
            $query->limit($limit);
        }

        // ------------------ form data ------------------
        if ($page_size) {
            $delivery_schedules = $query->paginate($page_size);
        } else {
            $delivery_schedules = $query->get();
        }

        return DeliverySchedule::collection($delivery_schedules);
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
