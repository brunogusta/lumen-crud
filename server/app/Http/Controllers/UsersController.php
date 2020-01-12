<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Http\Response;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\DB;


class UsersController extends Controller
{
    /** @var User */
    protected $user;
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct(User $user)
    {
        $this->middleware('auth');
    }

    public function index() {
        $isAdmin = $this->checkAdmin();

        if(!$isAdmin) {
            return response()->json('Just admin users can get all users!', 401);
        }

        $users = User::with('perfils')->get();
        return response()->json($users);
    }

    public function show($userId) {
        $user = User::with('perfils')->where('id', $userId)->get();

        if($user->isEmpty()) {
            return response()->json('The user informed not exists!', 404);
        }


        $isAdmin = $this->checkAdmin();
        $isSameUser = $this->validateSameUser($userId);


        if(!$isAdmin && $isSameUser) {

            return response()->json($user, 200);

        } else if($isAdmin && !$isSameUser) {

            return response()->json($user, 200);

        } else {

            return response()->json('Just admin users can check other users!', 401);
        }
    }

    public function update(Request $request) {
        $user = User::with('perfils')->where('id', $request->id)->get();

        if($user->isEmpty()) {
            return response()->json('The user informed not exists!', 404);
        }

        $isAdmin = $this->checkAdmin();
        $isSameUser = $this->validateSameUser($request->id);


        if($isAdmin) {
            User::where('id', $request->id)->update([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
            ]);

            if($request->perfilId) {
                DB::table('perfil_user')
                    ->where('user_id', $request->id)
                    ->update(['perfil_id' => $request->perfilId]);
            }

        }else if($isSameUser) {
            User::where('id', $request->id)->update([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
            ]);
        } else {
            return response()->json('Just admin users can update other users!', 401);
        }


        $newUser = User::find($request->id);
        return response()->json(['user' => $newUser, 'message' => 'User updated successfully!'], 200);
    }

    public function destroy($userId) {
        $user = User::with('perfils')->where('id', $userId)->get();
        if($user->isEmpty()) {
            return response()->json('The user informed not exists!', 404);
        }

        $isAdmin = $this->checkAdmin();
        $isSameUser = $this->validateSameUser($userId);


        if(!$isAdmin && $isSameUser) {

            User::find($userId)->delete();
            return response()->json('User deleted successfully', 200);

        } else if($isAdmin && !$isSameUser) {

            User::find($userId)->delete();
            return response()->json('User deleted successfully', 200);

        } else {

            return response()->json('Just admin users can delete other users!', 401);
        }
    }
}
