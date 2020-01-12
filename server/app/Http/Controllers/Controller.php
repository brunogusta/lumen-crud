<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Laravel\Lumen\Routing\Controller as BaseController;

use App\Models\User;

class Controller extends BaseController
{
    public function checkAdmin() {
        $email = Auth::payload()->get('email');

        $user = User::with('perfils')->where('email', $email)->get();

        if($user[0]->perfils[0]->id === 1) {
            return false;
        } else if($user[0]->perfils[0]->id === 2){
            return true;
        }
    }

    public function validateSameUser($id) {
        $email = Auth::payload()->get('email');

        $user = User::where('email', $email)->first();

        $int = (int)$id;

        if($user->id !== $int) {
            return false;
        } else {
            return true;
        }

    }
}
