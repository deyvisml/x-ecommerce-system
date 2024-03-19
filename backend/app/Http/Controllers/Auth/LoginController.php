<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login_user(Request $request)
    {
        $login_validation_rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];

        $validate_user = Validator::make($request->all(), $login_validation_rules);

        if ($validate_user->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Error de validación.',
                'data' => ['type_error' => 'general-error'],
            ]);
        }

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'status' => false,
                'message' => 'Correo electrónico o contraseña no válidos',
                'data' => ['type_error' => 'general-error'],
            ]);
        }

        $user = User::where('email', $request->email)->first();
        $user->roles = $user->roles; // very strange but it's working.

        return response()->json([
            'status' => true,
            'message' => 'Login correcto',
            'data' => ['token' => $user->createToken("TOKEN")->plainTextToken, 'user' => new UserResource($user)],
        ]);
    }

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
}
