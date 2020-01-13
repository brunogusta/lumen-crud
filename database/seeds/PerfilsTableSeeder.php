<?php

use Illuminate\Database\Seeder;

class PerfilsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app('db')
        ->table('perfils')
        ->insert([
            'name' => 'comum',
            'label' => 'Comum',
        ]);

        app('db')
        ->table('perfils')
        ->insert([
            'name' => 'admin',
            'label' => 'Administrator',
        ]);
    }
}
