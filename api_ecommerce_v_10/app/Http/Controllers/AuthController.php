<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'login_ecommerce', 'login_social']]);
    }


    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register()
    {
        // confirmed
        $validator = Validator::make(request()->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = new User;
        $user->name = request()->name;
        $user->email = request()->email;
        $user->password = bcrypt(request()->password);
        $user->state = 1;
        $role = \App\Models\Role::where('name', 'CLIENTE')->first();
        if ($role) {
            $user->role_id = $role->id;
        }
        $user->save();

        return response()->json($user, 201);
    }


    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt(["email" => $request->email, "password" => $request->password, "state" => 1])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth('api')->user();

        if ($user->two_factor_confirmed_at) {
            return response()->json([
                'requires_2fa' => true,
                'temp_token' => Crypt::encryptString($user->id)
            ], 200);
        }

        return $this->respondWithToken($token);
    }

    public function login_ecommerce(Request $request)
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt(["email" => $request->email, "password" => $request->password, "state" => 1])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth('api')->user();

        if ($user->two_factor_confirmed_at) {
            return response()->json([
                'requires_2fa' => true,
                'temp_token' => Crypt::encryptString($user->id)
            ], 200);
        }

        return $this->respondWithToken($token);
    }

    public function login_social(Request $request)
    {
        $user = User::where("email", $request->email)->first();
        if (!$user) {
            $user = new User;
            $user->name = $request->name;
            $user->surname = $request->surname ?? '';
            $user->email = $request->email;
            $user->password = bcrypt("12345678"); // Contraseña por defecto para usuarios sociales
            $user->state = 1;
            $role = \App\Models\Role::where('name', 'CLIENTE')->first();
            if ($role) {
                $user->role_id = $role->id;
            }
            $user->save();
        }

        if (!$token = auth('api')->login($user)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($user->two_factor_confirmed_at) {
            return response()->json([
                'requires_2fa' => true,
                'temp_token' => Crypt::encryptString($user->id)
            ], 200);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Verify 2FA code to complete login process.
     */
    public function verify2FALogin(Request $request)
    {
        $request->validate([
            'temp_token' => 'required|string',
            'code' => 'required|string',
        ]);

        try {
            $userId = Crypt::decryptString($request->temp_token);
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $google2fa = new \PragmaRX\Google2FA\Google2FA();
            $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);

            if ($valid) {
                // Generate the real JWT token now
                $token = auth('api')->login($user);
                return $this->respondWithToken($token);
            }

            return response()->json(['error' => 'Invalid 2FA code'], 401);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $user = auth('api')->user();
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "surname" => $user->surname,
                "email" => $user->email,
                "role" => $user->role ? $user->role->name : null,
                "company" => $user->company ? [
                    "id" => $user->company->id,
                    "name" => $user->company->name,
                    "status" => $user->company->status,
                ] : null,
            ],
        ]);
    }
}
