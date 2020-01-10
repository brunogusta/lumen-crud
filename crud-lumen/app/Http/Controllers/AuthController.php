<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Hash;

use  App\Models\User;

class AuthController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function register(Request $request)
    {
        if(User::where('email', $request->input('email'))->first()) {
            return response()->json(['error' => 'The email already exists'], 200);
        }

        try {
            $user = new User;
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $plainPassword = $request->input('password');
            $user->password = app('hash')->make($plainPassword);

            $user->save();

            $credentials = $request->only(['email', 'password']);
            $user->token = Auth::attempt($credentials);

            //return successful response
            return response()->json(['user' => $user, 'message' => 'CREATED'], 200);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => 'User Registration Failed!'], 404);
        }

    }

    /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */

    public function login(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();

        if(!Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'Password Incorrect!'], 404);;
        }

        $credentials = $request->only(['email', 'password']);


        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user->token = Auth::attempt($credentials);
        return $user;
    }
}

