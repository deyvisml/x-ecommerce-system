<?php

namespace App\Http\Controllers;

use App\Models\RoleUser;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

    public function seller_store_registration_auth(Request $request)
    {
        $user = $request->user();

        $validation_rules = [
            'store_name' => 'required',
            'ruc' => 'required',
            'business_name' => 'required',
            'bank' => 'required',
            'bank_account_number' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Error de validación.',
                'type_error' => 'validation-error',
                'errors' => $validation->errors(),
            ]);
        }

        // create (inactive) store
        Store::create([
            'name' => $request->store_name,
            'ruc' => $request->ruc,
            'business_name' => $request->business_name,
            'bank_id' => $request->bank,
            'bank_account_number' => $request->bank_account_number,
            'user_id' => $user->id,
            'state_id' => 2,
        ]);

        // create role_user
        $seller_role_id = 2;
        RoleUser::updateOrCreate(['user_id' => $user->id, 'role_id' => $seller_role_id], []);

        $data = ['status' => true, 'message' => "Registro de tienda realizado exitosamente."];

        return response()->json($data);
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
            'bank' => 'required',
            'bank_account_number' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Error de validación.',
                'type_error' => 'validation-error',
                'errors' => $validation->errors(),
            ]);
        }

        // verify if the email already has an account (state_id = 1)
        $user = User::where('email', $request->email)->where('state_id', 1)->first();
        if ($user) {
            return response()->json([
                'status' => false,
                'message' => 'El correo ya se encuentra registrado, inicie sesión o ingrese otro correo.',
                'type_error' => 'email-error',
            ]);
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
            'bank_id' => $request->bank,
            'bank_account_number' => $request->bank_account_number,
            'user_id' => $user->id,
            'state_id' => 2,
        ]);

        // create role_user
        $seller_role_id = 2;
        RoleUser::updateOrCreate(['user_id' => $user->id, 'role_id' => $seller_role_id], []);

        $data = ['status' => true, 'message' => "Registro de tienda realizado exitosamente."];

        return response()->json($data);
    }
}
