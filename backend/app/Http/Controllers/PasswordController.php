<?php

namespace App\Http\Controllers;

use App\Http\Controllers\MailController;
use App\Models\PasswordRecoveryRequest;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PasswordController extends Controller
{

    protected $mailController;

    public function __construct()
    {
        $this->mailController = new MailController();
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

    public function change_password_request(Request $request)
    {
        $validation_rules = [
            'email' => 'required',
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

        $email = $request->email;
        $user = RoleUser::leftJoin('users', 'role_user.user_id', 'users.id')->where('email', $email)->where('role_user.state_id', 1)->select('users.*')->first();

        if (!isset($user)) {
            $response = [
                'status' => false,
                'message' => 'El correo no tiene una cuenta activa.',
                'errors' => null,
            ];

            return response()->json($response);
        }

        $token = $this->generate_token();
        $url = $this->generate_recovery_password_url($user, $token);

        PasswordRecoveryRequest::create([
            'token' => $token,
            'url' => $url,
            'user_id' => $user->id,
            'state_id' => 1,
        ]);

        $this->mailController->send_recovery_password_mail($user, $url);

        $response = [
            'status' => true,
            'message' => 'Te hemos enviado un correo con las instrucciones para restablecer tu contraseña.',
            'data' => null,
        ];

        return response()->json($response);
    }

    public function verify_recovery_password_token(Request $request)
    {
        $validation_rules = [
            'token' => 'required',
            'user_id' => 'required',
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

        $token = $request->token;
        $user_id = $request->user_id;
        $passwordRecoveryRequest = PasswordRecoveryRequest::where("token", $token)->where("user_id", $user_id)->where('state_id', 1)->first();

        if (!isset($passwordRecoveryRequest)) {
            $response = [
                'status' => false,
                'message' => 'Token invalido.',
                'data' => null,
            ];

            return response()->json($response);
        }

        $response = [
            'status' => true,
            'message' => 'Token valido.',
            'data' => User::find($user_id),
        ];

        return response()->json($response);
    }

    public function recovery_password(Request $request)
    {
        $validation_rules = [
            "password" => "required",
            "password_confirmation" => "required",
            "token" => "required",
            "user_id" => "required",
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = [
                "status" => false,
                "message" => "Error de validación.",
                "data" => null,
                "errors" => $validation->errors(),
            ];

            return response()->json($response);
        }

        $response2 = $this->verify_recovery_password_token(new Request(["token" => $request->token, "user_id" => $request->user_id]));
        $response2 = json_decode($response2->getContent(), true);

        if (!$response2["status"]) {
            return response()->json($response2);
        }

        $user = User::find($request->user_id);
        $user->update([
            "password" => Hash::make($request->password),
        ]);

        PasswordRecoveryRequest::where("token", $request->token)->where("user_id", $request->user_id)->first()->update([
            "state_id" => 2,
        ]);

        $response = [
            "status" => true,
            "message" => "Su contraseña fue cambiada exitosamente.",
            "data" => null,
        ];

        return response()->json($response);
    }

    public function generate_token()
    {
        return hash('md5', Str::random(60)); // (sha256) always will generate a string with 32 characters.
    }

    public function generate_recovery_password_url($user, $token)
    {
        $url = config('app.frontend_url') . "/cambiar-contraseña?token=" . $token . "&user_id=" . $user->id;

        return $url;
    }
}
