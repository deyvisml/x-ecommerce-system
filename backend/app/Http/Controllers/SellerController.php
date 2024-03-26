<?php

namespace App\Http\Controllers;

use App\Http\Resources\SellerResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $role_user_state_id = $request->query('role_user_state_id');
        $search_query = $request->query('search_query');
        $filtering = $request->query('filtering');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        $query = User::select('users.*');

        // Añadir todos los atributos de la tabla "role_user" con alias
        foreach (Schema::getColumnListing('role_user') as $column) {
            $query->addSelect('role_user.' . $column . ' as role_user_' . $column);
        }

        $query->join('role_user', 'users.id', '=', 'role_user.user_id'); // JOIN ON (intersection)
        $query->where('role_user.role_id', 2); // 2 is the role id of "sellers"

        if ($role_user_state_id) {
            $query->where('role_user.state_id', $role_user_state_id);
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
            $sellers = $query->paginate($page_size);
        } else {
            // without pagination
            $sellers = $query->get();
        }

        return SellerResource::collection($query->get());
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
