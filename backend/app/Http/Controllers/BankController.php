<?php

namespace App\Http\Controllers;

use App\Http\Resources\BankResource;
use App\Models\Bank;
use Illuminate\Http\Request;

class BankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $state_id = $request->query('state_id');
        $search_query = $request->query('search_query');
        $filtering = $request->query('filtering');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        $query = Bank::query();

        if ($state_id) {
            $query->where('state_id', $state_id);
        }
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
            $banks = $query->paginate($page_size);
        } else {
            // without pagination
            $banks = $query->get();
        }

        return BankResource::collection($banks);
    }

    /**
     * Bank a newly created resource in storage.
     */
    public function Bank(Request $request)
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
