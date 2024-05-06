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
        $filtering = $request->query('filtering');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        $query = Store::query();

        // ------------------ select columns ------------------
        $query->select('stores.*');
        foreach (Schema::getColumnListing('users') as $column) {
            $query->addSelect('users.' . $column . ' as users_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }
        foreach (Schema::getColumnListing('role_user') as $column) {
            $query->addSelect('role_user.' . $column . ' as role_user_' . $column);
        }

        $query->addSelect('role_user_states.name as role_user_state_name');

        // ------------------ joins ------------------
        $query->leftJoin('users', 'stores.user_id', '=', 'users.id');
        $query->leftJoin('states', 'stores.state_id', '=', 'states.id');
        $query->leftJoin('role_user', function ($join) {
            $join->on('users.id', '=', 'role_user.user_id')
                ->where('role_user.role_id', '=', 2); // Filtrar por el ID del rol "vendedor"
        });

        // Alias para el join con states en role_user, we do in this way because we actually has a join with states table
        $query->leftJoin('states as role_user_states', 'role_user.state_id', '=', 'role_user_states.id');

        // ------------------ getting data ------------------
        if ($filtering) {
            foreach ($filtering as $filter) {
                if (isset($filter['values'])) {
                    $query->whereIn($filter['column'], $filter['values']);
                }
            }
        }
        if ($search_query) {
            $query->where(function ($query) use ($search_query) {
                $columns = ['stores.id', 'stores.name', 'stores.ruc', 'stores.business_name', 'users.first_name', 'users.last_name', 'states.name'];

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
            $query->orderBy('stores.id', 'ASC'); // IMPORTANT (solver order), some methods like whereIn loses the "default order" (by id)
        }

        if ($limit) {
            $query->limit($limit);
        }

        // ------------------ form data ------------------
        if ($page_size) {
            $stores = $query->paginate($page_size);
        } else {
            $stores = $query->get();
        }

        return StoreResource::collection($stores);
    }

    public function my_stores(Request $request)
    {
        //$this->authorize("view_own", Store::class);

        $filtering = $request->query('filtering');
        $excluding = $request->query('excluding');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        // ------------------ query ------------------
        $query = Store::query();

        // ------------------ select columns ------------------
        $query->select('stores.*');
        foreach (Schema::getColumnListing('banks') as $column) {
            $query->addSelect('banks.' . $column . ' as banks_' . $column);
        }
        foreach (Schema::getColumnListing('users') as $column) {
            $query->addSelect('users.' . $column . ' as users_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('banks', 'stores.bank_id', '=', 'banks.id');
        $query->leftJoin('users', 'stores.user_id', '=', 'users.id');
        $query->leftJoin('states', 'stores.state_id', '=', 'states.id');

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
                $columns = [];

                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            });
        }

        $query->where('users.id', $request->user()->id);

        if ($sorting) {
            foreach ($sorting as $sort) {
                if ($sort['way'] == 'random') {
                    $query->inRandomOrder();
                } else {
                    $query->orderBy($sort['column'], $sort['way']);
                }
            }
        } else {
            $query->orderBy('stores.id', 'ASC'); // IMPORTANT (solver order), some methods like whereIn loses the "default order" (by id)
        }

        if ($limit) {
            $query->limit($limit);
        }

        // ------------------ form data ------------------
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
            'phone_number' => 'required',
            'legal_representative' => 'required',
            'bank_id' => 'required',
            'bank_account_number' => 'required',
            'user_id' => 'required',
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
            'phone_number' => $request->phone_number,
            'legal_representative' => $request->legal_representative,
            'bank_id' => $request->bank_id,
            'bank_account_number' => $request->bank_account_number,
            'user_id' => $request->user_id,
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

    public function change_state(Request $request, string $id)
    {
        $store = Store::find($id);
        $this->authorize("update", $store);

        if (!$store) {
            $response = ['status' => false, 'message' => 'No se encontró ninguna registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $validation_rules = [
            'state_id' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = ['status' => false, 'message' => 'Datos no validos.', 'errors' => $validation->errors()];
            return response()->json($response);
        }

        // only to accept an application store
        if ($request->state_id == 1) {
            $seller = $store->user;

            $seller_role_id = 2;
            $active_state_id = 1;

            RoleUser::updateOrCreate([
                'role_id' => $seller_role_id,
                'user_id' => $seller->id,
            ], [
                'state_id' => $active_state_id,
            ]);
        }

        $store->update([
            'state_id' => $request->input('state_id'),
        ]);

        $response = ['status' => true, 'message' => 'Registro actualizado exitosamente.'];

        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $store = Store::find($id);
        $this->authorize("update", $store);

        if (!$store) {
            $response = ['status' => false, 'message' => 'No se encontró ningún registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $validation_rules = [
            'store_name' => 'required',
            'ruc' => 'required',
            'business_name' => 'required',
            'phone_number' => 'required',
            'bank_account_number' => '',
            'bank_id' => '',
            'user_id' => 'required',
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
            'phone_number' => $request->input('phone_number'),
            'bank_account_number' => $request->input('bank_account_number'),
            'bank_id' => $request->input('bank_id'),
            'user_id' => $request->input('user_id'),
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
        //$this->authorize("create", Store::class);

        $user = $request->user();

        $validation_rules = [
            'store_name' => 'required',
            'ruc' => 'required',
            'business_name' => 'required',
            'phone_number' => 'required',
            'legal_representative' => 'required',
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
            'phone_number' => $request->phone_number,
            'legal_representative' => $request->legal_representative,
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
            'user_phone_number' => 'required',
            'store_name' => 'required',
            'ruc' => 'required',
            'business_name' => 'required',
            'phone_number' => 'required',
            'legal_representative' => 'required',
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
            'phone_number' => $request->user_phone_number,
            'state_id' => 1,
        ]);

        // create (inactive) store
        Store::create([
            'name' => $request->store_name,
            'ruc' => $request->ruc,
            'business_name' => $request->business_name,
            'phone_number' => $request->phone_number,
            'legal_representative' => $request->legal_representative,
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
