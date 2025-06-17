<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    function index(Request $request)
    {
        return Inertia('dashboard/profile');
    }

    function update(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'username' => 'required|string|max:255|alpha_dash',
                'email' => 'required|string|email|max:255',
            ]);

            $user = $request->user();

            DB::table("users")
                ->where('id', $user->id)
                ->update([
                    'name' => $request->input('name'),
                    'username' => $request->input('username'),
                    'email' => $request->input('email'),
                ]);

            return redirect()->route('dashboard.profile')->with('success', 'Profile updated successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.profile')->with('error', 'Failed to update profile: ' . $e->getMessage());
        }
    }
}
