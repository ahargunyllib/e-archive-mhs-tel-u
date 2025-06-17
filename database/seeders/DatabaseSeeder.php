<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin 1',
            'username' => 'admin1',
            'email' => 'admin1@gmail.com',
            'password' => Hash::make('password123')
        ]);
    }
}
