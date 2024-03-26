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
        $search_query = $request->query('search_query');
        $filtering = $request->query('filtering');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        $query = State::query();

        if ($search_query) {
            $columns = ['name'];
            foreach ($columns as $column) {
                $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
            }
        }
        if ($filtering) {
            foreach ($filtering as $filter) {
                $query->where($filter['id'], $filter['value']);
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
