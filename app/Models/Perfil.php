<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{

    protected $fillable = [
        'name',
        'label'
    ];

    public function user() {
        return $this->belongsToMany(User::class);
    }
}
