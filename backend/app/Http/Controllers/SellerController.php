<?php

namespace App\Http\Controllers;

use App\Http\Resources\SellerResource;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class SellerController extends Controller
{
    private $seller_role_id = 2;
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
        foreach (Schema::getColumnListing('role_user') as $column) {
            $query->addSelect('role_user.' . $column . ' as role_user_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('document_types', 'users.document_type_id', '=', 'document_types.id');
        $query->leftJoin('addresses', 'users.address_id', '=', 'addresses.id');
        $query->leftJoin('role_user', function ($join) {
            $join->on('users.id', '=', 'role_user.user_id')
                ->where('role_user.role_id', '=', $this->seller_role_id);
        });
        $query->leftJoin('states', 'role_user.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        $query->where('role_user.role_id', $this->seller_role_id);

        if ($filtering) {
            foreach ($filtering as $filter) {
                if (isset($filter['values'])) {
                    $query->whereIn($filter['column'], $filter['values']);
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
            $sellers = $query->paginate($page_size);
        } else {
            $sellers = $query->get();
        }

        return SellerResource::collection($sellers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize("create_seller", User::class);

        $validation_rules = [
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'phone_number' => 'required',
            'state_id' => 'required',
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

        // create or update (active) user
        $user = User::create([
            'email' => $request->email,
            'password' => $request->password,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone_number' => $request->phone_number,
            'document_type_id' => $request->document_type_id,
            'document_number' => $request->document_number,
            'state_id' => 1,
        ]);

        // create role_user
        $seller_role_id = 2;
        RoleUser::create(['user_id' => $user->id, 'role_id' => $seller_role_id, "state_id", $request->state_id]);

        $response = ['status' => true, 'message' => "Registro realizado exitosamente."];

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
        $seller = User::find($id);
        $this->authorize("update_seller", $seller);

        if (!$seller) {
            $response = ['status' => false, 'message' => 'No se encontró ningún registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $validation_rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'phone_number' => 'required',
            'state_id' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = ['status' => false, 'message' => 'Datos no validos.', 'errors' => $validation->errors()];
            return response()->json($response);
        }

        // update seller
        $seller->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone_number' => $request->phone_number,
            'document_type_id' => $request->document_type_id,
            'document_number' => $request->document_number,
        ]);

        // update role_user
        $role_user = RoleUser::where('role_id', $this->seller_role_id)->where('user_id', $seller->id)->first();
        $role_user->update([
            'state_id' => $request->state_id,
        ]);

        $response = ['status' => true, 'message' => 'Registro actualizado exitosamente.'];

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $seller = User::find($id);
        $this->authorize("delete_seller", $seller);

        if (!$seller) {
            $response = ['status' => false, 'message' => 'No se encontró ningún registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $role_user = RoleUser::where('role_id', $this->seller_role_id)->where('user_id', $seller->id)->first();

        $deleted_state_id = 3;
        $role_user->update([
            'state_id' => $deleted_state_id,
        ]);

        $response = ['status' => true, 'message' => 'Registro eliminado exitosamente.'];

        return response()->json($response);
    }
}
