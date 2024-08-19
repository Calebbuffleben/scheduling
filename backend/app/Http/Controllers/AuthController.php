<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            $accessToken = $user->createToken('Personal Access Token')->plainTextToken;
            $refreshToken = $user->createToken('Refresh Token', ['*'], now()->addMonth())->plainTextToken;

            return response()->json([
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken
            ], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function refreshToken(Request $request)
    {
        $refreshToken = $request->input('refresh_token');
        $token = PersonalAccessToken::findToken($refreshToken);

        if(!$token){
            return response()->json(['message' => 'Invalid refresh token'], 401);
        }

        $user = $token->tokenable;

        //Verify this validation. Should verify if the token provided maches with refresh token stored.
        if(!$user || $token->name !== 'Refresh Token'){
            return response()->json(['message' => 'Invalid refresh token'], 401);
        }

        $token->delete();

        $newAccessToken = $user->createToken('Personal Access Token', ['*'], now()->addMinutes(60))->plainTextToken;
        $newRefreshToken = $user->createToken('Refresh Token', ['*'], now()->addDays(30))->plainTextToken;

        return response()->json([
            'access_token' => $newAccessToken,
            'refresh_token' => $newRefreshToken,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }
}
