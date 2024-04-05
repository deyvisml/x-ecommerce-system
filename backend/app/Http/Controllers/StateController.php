<?php

namespace App\Http\Controllers;

use App\Http\Resources\StateResource;
use App\Models\State;
use Illuminate\Http\Request;

class StateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filtering = $request->query('filtering');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        $query = State::query();

        if ($filtering) {
            foreach ($filtering as $filter) {
                if (!is_array($filter['values'])) {
                    $filter['values'] = array($filter['values']);
                }

                $query->whereIn($filter['column'], $filter['values']);
            }
        }
        if ($search_query) {
            $columns = ['name'];
            foreach ($columns as $column) {
                $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
            }
        }
        if ($sorting) {
            foreach ($sorting as $sort) {
                $query->orderBy($sort['id'], $sort['desc'] == 'true' ? 'DESC' : 'ASC');
            }
        }
        if ($limit) {
            $query->limit($limit);
        }

        if ($page_size) {
            // pagination
            $states = $query->paginate($page_size);
        } else {
            // without pagination
            $states = $query->get();
        }

        return StateResource::collection($states);
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
