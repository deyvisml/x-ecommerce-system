<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function store_customers(Request $request, string $store_id)
    {
        $store = Store::find($store_id);
        $this->authorize("viewAllStoreCustomers", [User::class, $store]);

        $filtering = $request->query('filtering');
        $excluding = $request->query('excluding');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        // ------------------ query ------------------
        $query = User::query();

        // ------------------ select columns ------------------
        $query->select('users.*');
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->join('orders', 'users.id', '=', 'orders.customer_id');
        $query->leftJoin('states', 'users.state_id', '=', 'states.id');

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
                $columns = ['users.id', 'users.first_name', 'users.last_name', 'users.email', 'users.phone_number', 'states.name'];

                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            });
        }

        $query->where('orders.store_id', $store->id);
        $query->whereIn('orders.state_id', [12, 13, 14, 15, 16]);
        $query->distinct();

        if ($sorting) {
            foreach ($sorting as $sort) {
                if ($sort['way'] == 'random') {
                    $query->inRandomOrder();
                } else {
                    $query->orderBy($sort['column'], $sort['way']);
                }
            }
        } else {
            $query->orderBy('users.id', 'ASC'); // IMPORTANT (solver order), some methods like whereIn loses the "default order" (by id)
        }

        if ($limit) {
            $query->limit($limit);
        }

        // ------------------ form data ------------------
        if ($page_size) {
            $customers = $query->paginate($page_size);
        } else {
            $customers = $query->get();
        }

        return CustomerResource::collection($customers);
    }

    public function store_customer(string $store_id, string $customer_id)
    {
        $customer = User::find($customer_id);
        $this->authorize("viewStoreCustomer", [$customer, Store::find($store_id)]);

        // ------------------ query ------------------
        $query = User::query();

        // ------------------ select columns ------------------
        $query->select('users.*');
        foreach (Schema::getColumnListing('document_types') as $column) {
            $query->addSelect('document_types.' . $column . ' as document_types_' . $column);
        }
        foreach (Schema::getColumnListing('addresses') as $column) {
            $query->addSelect('addresses.' . $column . ' as addresses_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('document_types', 'users.document_type_id', '=', 'document_types.id');
        $query->leftJoin('addresses', 'users.address_id', '=', 'addresses.id');
        $query->leftJoin('states', 'users.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        $query->where('users.id', $customer_id);

        // ------------------ form data ------------------
        $customer = $query->first();

        return new CustomerResource($customer);
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