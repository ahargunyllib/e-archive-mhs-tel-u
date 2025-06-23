<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Uid\Ulid;

class MemberController extends Controller
{
    function index(Request $request)
    {
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);

        $offset = ($page - 1) * $limit;
        $members = DB::table('members')
            ->select([
                "id",
                "name",
                "address",
                "contact",
                "division",
                "set_type",
                "batch_year",
                "period",
                "created_at",
                "updated_at",
            ])
            ->orderBy('created_at', 'desc')
            ->offset($offset)
            ->limit($limit)
            ->get();

        $count = DB::table('members')->count();

        $totalPages = ceil($count / $limit);

        return inertia('dashboard/members', [
            'members' => $members,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $count,
                'totalPages' => $totalPages,
            ]
        ]);
    }

    function show(Request $request, $id)
    {
        $member = DB::table('members')->where('id', $id)->first();

        if (!$member) {
            return redirect()->route('dashboard.members')->with('error', 'Member not found.');
        }

        return inertia('dashboard/member', [
            'member' => $member,
        ]);
    }

    function create()
    {
        return inertia('dashboard/create-member');
    }

    function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'contact' => 'required|string|max:255',
                'division' => 'required|numeric',
                'set_type' => 'required|numeric',
                'batch_year' => 'required|numeric',
                'period' => 'required|numeric',
            ]);

            DB::table('members')->insert([
                'id' => Ulid::generate(),
                'name' => $request->input('name'),
                'address' => $request->input('address'),
                'contact' => $request->input('contact'),
                'division' => $request->input('division'),
                'set_type' => $request->input('set_type'),
                'batch_year' => $request->input('batch_year'),
                'period' => $request->input('period'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect()->route('dashboard.members')->with('success', 'Member created successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.members.create')->with('error', 'Failed to create member: ' . $e->getMessage());
        }
    }

    function edit(Request $request, $id)
    {
        $member = DB::table('members')->where('id', $id)->first();

        if (!$member) {
            return redirect()->route('dashboard.members')->with('error', 'Member not found.');
        }

        return inertia('dashboard/edit-member', [
            'member' => $member,
        ]);
    }

    function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'contact' => 'required|string|max:255',
                'division' => 'required|numeric',
                'set_type' => 'required|numeric',
                'batch_year' => 'required|numeric',
                'period' => 'required|numeric',
            ]);

            DB::table('members')
                ->where('id', $id)
                ->update([
                    'name' => $request->input('name'),
                    'address' => $request->input('address'),
                    'contact' => $request->input('contact'),
                    'division' => $request->input('division'),
                    'set_type' => $request->input('set_type'),
                    'batch_year' => $request->input('batch_year'),
                    'period' => $request->input('period'),
                    'updated_at' => now(),
                ]);

            return redirect()->route('dashboard.members')->with('success', 'Member updated successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.members.edit', ['id' => $id])->with('error', 'Failed to update member: ' . $e->getMessage());
        }
    }

    function delete(Request $request, $id)
    {
        try {
            DB::table('members')->where('id', $id)->delete();
            return redirect()->route('dashboard.members')->with('success', 'Member deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.members')->with('error', 'Failed to delete member: ' . $e->getMessage());
        }
    }
}
