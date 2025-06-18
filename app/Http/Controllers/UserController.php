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
            // change role to numeric
            $request['role'] = (int)$request->input('role');

            $request->validate([
                'name' => 'required|string|max:255',
                'username' => 'required|string|max:255|alpha_dash',
                'email' => 'required|string|email|max:255',
                'role' => 'required|numeric',
                'password' => 'required|string|min:8',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Check if username or email already exists
            $existingUser = DB::table('users')
                ->where('username', $request->input('username'))
                ->orWhere('email', $request->input('email'))
                ->first();
            if ($existingUser) {
                return redirect()->route('dashboard.users.create')->with('error', 'Username or email already exists.');
            }

            // Handle profile picture upload if provided
            if ($request->hasFile('profile_picture')) {
                $profilePicturePath = $request->file('profile_picture')->store('profile-pictures', 'public');
            } else {
                $profilePicturePath = null; // or set a default picture path
            }

            DB::table('users')->insert([
                'id' => Uuid::uuid7(),
                'name' => $request->input('name'),
                'username' => $request->input('username'),
                'email' => $request->input('email'),
                'role' => $request->input('role'),
                'password' => bcrypt($request->input('password')),
                'photo_profile' => $profilePicturePath,
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
            // change role to numeric
            $request['role'] = (int)$request->input('role');

            $request->validate([
                'name' => 'required|string|max:255',
                'username' => 'required|string|max:255|alpha_dash',
                'email' => 'required|string|email|max:255',
                'role' => 'required|numeric',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Check if username or email already exists for other users
            $existingUser = DB::table('users')
                ->where(function ($query) use ($request, $id) {
                    $query->where('username', $request->input('username'))
                        ->orWhere('email', $request->input('email'));
                })
                ->where('id', '!=', $id)
                ->first();
            if ($existingUser) {
                return redirect()->route('dashboard.users.edit', ['id' => $id])->with('error', 'Username or email already exists.');
            }

            // Handle profile picture upload if provided
            if ($request->hasFile('profile_picture')) {
                $profilePicturePath =  $request->file('profile_picture')->store('profile-pictures', 'public');
            } else {
                $profilePicturePath = null; // or keep the existing picture
            }

            DB::table('users')
                ->where('id', $id)
                ->update([
                    'name' => $request->input('name'),
                    'username' => $request->input('username'),
                    'email' => $request->input('email'),
                    'role' => $request->input('role'),
                    'photo_profile' => $profilePicturePath,
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
