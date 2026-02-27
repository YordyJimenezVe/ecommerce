<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'We can\'t find a user with that email address.'], 404);
        }

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => Hash::make($token),
                'created_at' => Carbon::now()
            ]
        );

        // Envía el correo. Asumiendo que el frontend está en el puerto 4200
        $resetUrl = env('FRONTEND_URL', 'http://localhost:4200') . '/auth/reset-password?token=' . $token . '&email=' . urlencode($user->email);

        Mail::send([], [], function ($message) use ($user, $resetUrl) {
            $message->to($user->email)
                ->subject('Reset Password Notification')
                ->html("<p>You are receiving this email because we received a password reset request for your account.</p>
                        <p><a href=\"{$resetUrl}\" style=\"display:inline-block;padding:10px 20px;color:#fff;background-color:#f89c0e;border-radius:5px;text-decoration:none;\">Reset Password</a></p>
                        <p>If you did not request a password reset, no further action is required.</p>");
        });

        return response()->json(['message' => 'We have emailed your password reset link!']);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $resetRequest = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!$resetRequest || !Hash::check($request->token, $resetRequest->token)) {
            return response()->json(['message' => 'This password reset token is invalid.'], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'We can\'t find a user with that email address.'], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Your password has been reset!']);
    }
}
