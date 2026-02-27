<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PragmaRX\Google2FA\Google2FA;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Facades\Log;

class TwoFactorController extends Controller
{
    /**
     * Generate 2FA Secret and QR Code for the authenticated user.
     */
    public function generateSecret(Request $request)
    {
        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $google2fa = new Google2FA();

        // Generate a new secret key
        $secretKey = $google2fa->generateSecretKey();

        // Temporarily store it so the user can verify it before saving
        $user->two_factor_secret = $secretKey;
        $user->save();

        // Generate the QR code URL
        $qrCodeUrl = $google2fa->getQRCodeUrl(
            config('app.name'),
            $user->email,
            $secretKey
        );

        // Render QR Code as SVG
        $renderer = new ImageRenderer(
            new RendererStyle(400),
            new SvgImageBackEnd()
        );
        $writer = new Writer($renderer);
        $svgQrCode = $writer->writeString($qrCodeUrl);

        return response()->json([
            'secret' => $secretKey,
            'qr_code_svg' => base64_encode($svgQrCode),
            'qr_code_url' => $qrCodeUrl
        ]);
    }

    /**
     * Enable 2FA for the user by verifying the first code.
     */
    public function enable(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if (!$user->two_factor_secret) {
            return response()->json(['error' => '2FA secret not generated. Generate a secret first.'], 400);
        }

        $google2fa = new Google2FA();

        $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);

        if ($valid) {
            $user->two_factor_confirmed_at = now();

            // Optionally generate recovery codes here
            $recoveryCodes = collect(range(1, 8))->map(function () {
                return \Illuminate\Support\Str::random(10) . '-' . \Illuminate\Support\Str::random(10);
            })->toArray();

            $user->two_factor_recovery_codes = json_encode($recoveryCodes);
            $user->save();

            return response()->json(['message' => '2FA enabled successfully', 'recovery_codes' => $recoveryCodes]);
        }

        return response()->json(['error' => 'Invalid verification code.'], 400);
    }

    /**
     * Disable 2FA for the user.
     */
    public function disable(Request $request)
    {
        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->two_factor_secret = null;
        $user->two_factor_confirmed_at = null;
        $user->two_factor_recovery_codes = null;
        $user->save();

        return response()->json(['message' => '2FA disabled successfully']);
    }
}
