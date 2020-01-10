<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Http\Response;

use Illuminate\Support\Facades\Auth;


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

        $users = User::all();
        return $users;
    }

    public function show($userId) {

       $user = User::find($userId);

       return $user;
    }

    public function uptade(Request $request, $userId) {
        $user = $this->user->find($userId);

        if(empty($user)) {
            throw new Error('User not found');
        }

        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
        ]);

        return response($user, 200);
    }

    public function destroy($userId) {
        $user = $this->user->find($userId);

        if(empty($user)) {
            throw new Error('User not found');
        }

        $user->delete();

        return response('User successfully deleted.', 200);
    }
}
