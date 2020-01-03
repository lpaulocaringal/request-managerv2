<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'first_name' => 'Dawe',
            'middle_name' => 'Arthur',
            'last_name' => 'Thermann',
            'email' => 'daweathermann@gmail.com',
            'password' => bcrypt('6969'),
            'access_key' => 'analyst'
        ]);
        DB::table('users')->insert([
            'first_name' => 'Luis Paulo',
            'middle_name' => 'Edoloverio',
            'last_name' => 'Caringal',
            'email' => 'lcaringal@opentext.com',
            'password' => bcrypt('password'),
            'access_key' => 'manager'
        ]);
        DB::table('users')->insert([
            'first_name' => 'Sample',
            'middle_name' => 'Sample',
            'last_name' => 'Sample',
            'email' => 'sample@opentext.com',
            'password' => bcrypt('hello'),
            'access_key' => 'analyst'
        ]);
    }
}
