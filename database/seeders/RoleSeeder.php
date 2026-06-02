<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        Role::findOrCreate('admin');
        Role::findOrCreate('user');

        // Create users and assign roles
        $AdminUser = User::create([
            'name' => 'a',
            'email' => 'a@a.a',
            'password' => bcrypt('a'),
            'email_verified_at' => now(),
        ]);
        $AdminUser->assignRole(['admin']);

        $user = User::create([
            'name' => 'u',
            'email' => 'u@u.u',
            'password' => bcrypt('u'),
            'email_verified_at' => now(),
        ]);

        $user->assignRole(['user']);
    }
}
