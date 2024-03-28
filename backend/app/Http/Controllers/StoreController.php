<?php

namespace App\Http\Controllers;

use App\Http\Resources\StoreResource;
use App\Models\RoleUser;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
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

        $query = Store::select('stores.*');

        // Añadir todos los atributos de la tabla "users" con alias
        foreach (Schema::getColumnListing('users') as $column) {
            $query->addSelect('users.' . $column . ' as users_' . $column);
        }

        // Añadir todos los atributos de la tabla "states" con alias
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        $query->join('users', 'stores.user_id', '=', 'users.id');
        $query->join('states', 'stores.state_id', '=', 'states.id');

        if ($state_id) {
            $query->where('state_id', $state_id);
        }
        if ($search_query) {
            $columns = ['name', 'ruc', 'business_name'];
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
            $stores = $query->paginate($page_size);
        } else {
            $stores = $query->get();
        }

        return StoreResource::collection($stores);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize("create", Store::class);

        $validation_rules = [
            'store_name' => 'required',
            'ruc' => 'required',
            'business_name' => 'required',
            'bank_account_number' => '',
            'bank_id' => '',
            'seller_id' => 'required',
            'state_id' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = ['status' => false, 'message' => 'Datos no validos.', 'errors' => $validation->errors()];
            return response()->json($response);
        }

        Store::create([
            'name' => $request->store_name,
            'ruc' => $request->ruc,
            'business_name' => $request->business_name,
            'bank_id' => $request->bank_id,
            'bank_account_number' => $request->bank_account_number,
            'user_id' => $request->seller_id,
            'state_id' => $request->state_id,
        ]);

        $response = ['status' => true, 'message' => 'Registro creado exitosamente.'];

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
        $store = Store::find($id);
        $this->authorize("update", $store);

        if (!$store) {
            $response = ['status' => false, 'message' => 'No se encontró ninguna registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $validation_rules = [
            'store_name' => 'required',
            'ruc' => 'required',
            'business_name' => 'required',
            'bank_account_number' => '',
            'bank_id' => '',
            'seller_id' => 'required',
            'state_id' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = ['status' => false, 'message' => 'Datos no validos.', 'errors' => $validation->errors()];
            return response()->json($response);
        }

        $store->update([
            'name' => $request->input('store_name'),
            'ruc' => $request->input('ruc'),
            'business_name' => $request->input('business_name'),
            'bank_account_number' => $request->input('bank_account_number'),
            'bank_id' => $request->input('bank_id'),
            'user_id' => $request->input('seller_id'),
            'state_id' => $request->input('state_id'),
        ]);

        $response = ['status' => true, 'message' => 'Registro actualizado exitosamente.'];

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $store = Store::find($id);
        $this->authorize("delete", $store);

        if (!$store) {
            $response = ['status' => false, 'message' => 'No se encontró ninguna registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $deleted_state_id = 3;
        $store->update([
            'state_id' => $deleted_state_id,
        ]);

        $response = ['status' => true, 'message' => 'Registro eliminado exitosamente.'];

        return response()->json($response);
    }

    public function seller_store_registration_auth(Request $request)
    {
        $this->authorize("create", Store::class);

        $user = $request->user();

        $validation_rules = [
            'store_name' => 'required',
            'ruc' => 'required',
            'business_name' => 'required',
            'bank_id' => 'required',
            'bank_account_number' => 'required',
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

        // create (inactive) store
        Store::create([
            'name' => $request->store_name,
            'ruc' => $request->ruc,
            'business_name' => $request->business_name,
            'bank_id' => $request->bank_id,
            'bank_account_number' => $request->bank_account_number,
            'user_id' => $user->id,
            'state_id' => 2,
        ]);

        // create role_user
        $seller_role_id = 2;
        RoleUser::updateOrCreate(['user_id' => $user->id, 'role_id' => $seller_role_id], []);

        $response = ['status' => true, 'message' => "Registro de tienda realizado exitosamente."];

        return response()->json($response);
    }

    public function seller_store_registration(Request $request)
    {
        $validation_rules = [
            'email' => 'required|email',
            'password' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'phone_number' => 'required',
            'store_name' => 'required',
            'ruc' => 'required',
            'business_name' => 'required',
            'bank_id' => 'required',
            'bank_account_number' => 'required',
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

        // verify if the email already has an account (state_id = 1)
        $user = User::where('email', $request->email)->where('state_id', 1)->first();
        if ($user) {
            $response = [
                'status' => false,
                'message' => 'El correo ya se encuentra registrado, inicie sesión o ingrese otro correo.',
                'type_error' => 'email-error',
            ];

            return response()->json($response);
        }

        // create or update (active) user
        $user = User::updateOrCreate([
            'email' => $request->email,
        ], ['first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'password' => $request->password,
            'phone_number' => $request->phone_number,
            'state_id' => 1,
        ]);

        // create (inactive) store
        Store::create([
            'name' => $request->store_name,
            'ruc' => $request->ruc,
            'business_name' => $request->business_name,
            'bank_id' => $request->bank_id,
            'bank_account_number' => $request->bank_account_number,
            'user_id' => $user->id,
            'state_id' => 2,
        ]);

        // create role_user
        $seller_role_id = 2;
        RoleUser::updateOrCreate(['user_id' => $user->id, 'role_id' => $seller_role_id], []);

        $response = ['status' => true, 'message' => "Registro de tienda realizado exitosamente."];

        return response()->json($response);
    }
}
