<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

class UserController extends Controller
{
    function index(Request $request)
    {
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);

        $offset = ($page - 1) * $limit;
        $users = DB::table('users')
            ->select([
                "id",
                "name",
                "username",
                "email",
                "role",
                "photo_profile",
            ])
            ->orderBy('created_at', 'desc')
            ->offset($offset)
            ->limit($limit)
            ->get();

        $count = DB::table('users')->count();

        $totalPages = ceil($count / $limit);

        return inertia('dashboard/users', [
            'users' => $users,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $count,
                'totalPages' => $totalPages,
            ]
        ]);
    }

    function create()
    {
        return inertia('dashboard/create-user');
    }

    function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'username' => 'required|string|max:255|alpha_dash',
                'email' => 'required|string|email|max:255|unique:users',
                'role' => 'required|numeric',
                'password' => 'required|string|min:8',
            ]);

            DB::table('users')->insert([
                'id' => Uuid::uuid7(),
                'name' => $request->input('name'),
                'username' => $request->input('username'),
                'email' => $request->input('email'),
                'role' => $request->input('role'),
                'password' => bcrypt($request->input('password')),
            ]);

            return redirect()->route('dashboard.users')->with('success', 'User created successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.users.create')->with('error', 'Failed to create user: ' . $e->getMessage());
        }
    }

    function edit(Request $request, $id)
    {
        $user = DB::table('users')->where('id', $id)->first();

        if (!$user) {
            return redirect()->route('dashboard.users')->with('error', 'User not found.');
        }

        return inertia('dashboard/edit-user', [
            'user' => $user,
        ]);
    }

    function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'username' => 'required|string|max:255|alpha_dash',
                'email' => 'required|string|email|max:255|unique:users,email,' . $id,
                'role' => 'required|numeric',
            ]);

            DB::table('users')
                ->where('id', $id)
                ->update([
                    'name' => $request->input('name'),
                    'username' => $request->input('username'),
                    'email' => $request->input('email'),
                    'role' => $request->input('role'),
                ]);

            return redirect()->route('dashboard.users')->with('success', 'User updated successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.users.edit', ['id' => $id])->with('error', 'Failed to update user: ' . $e->getMessage());
        }
    }

    function delete(Request $request, $id)
    {
        try {
            DB::table('users')->where('id', $id)->delete();
            return redirect()->route('dashboard.users')->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.users')->with('error', 'Failed to delete user: ' . $e->getMessage());
        }
    }
}
