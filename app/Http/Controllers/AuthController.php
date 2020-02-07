<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Hash;

use  App\Models\User;

use Illuminate\Support\Facades\DB;

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
            return response()->json(['error' => 'The email already exists'], 404);
        }

        try {
            $user = new User;
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $plainPassword = $request->input('password');
            $user->password = app('hash')->make($plainPassword);


            $user->save();



            User::find($user->id)->perfils()->attach(1);



            $response = User::with('perfils')->where('id', $user->id)->get();




            $credentials = $request->only(['email', 'password']);

            $token = Auth::claims(['email' => $user->email])->attempt($credentials);


            //return successful response
            return response()->json(['user' => $response, 'token' => $token], 200);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => 'User Registration Failed!', $e], 404);
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


        if(!$user) {
            return response()->json(['message' => 'This count not exists'], 404);
        }

        if(!Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'Password Incorrect!'], 404);
        }

        $credentials = $request->only(['email', 'password']);


        $user->token = Auth::claims(['email' => $user->email])->attempt($credentials);

        return response()->json(['user' => $user], 200);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/api/v1/login')->with(['message' => 'Successfully logged out']);
    }
}

