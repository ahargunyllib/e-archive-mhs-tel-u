<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Uid\Ulid;

class MemberController extends Controller
{
    function index(Request $request)
    {
        $page = (int)$request->input('page', 1);
        $limit = (int)$request->input('limit', 10);
        $search = $request->input('search', '');
        $set_type = (int)$request->input('set_type', 0);
        $period = (int)$request->input('period', 0);

        $offset = ($page - 1) * $limit;
        $members = DB::table('members')
            ->select([
                "id",
                "nim",
                "name",
                "address",
                "contact",
                "division",
                "set_type",
                "batch_year",
                "period",
                "photo_profile",
                "email",
                "instagram",
                "linkedin",
                "created_at",
                "updated_at",
            ]);

        if (!empty($search)) {
            $members = $members->where('name', 'like', '%' . $search . '%')
                ->orWhere('nim', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%')
                ->orWhere('division', 'like', '%' . $search . '%');
        }

        if ($set_type > 0) {
            $members = $members->where('set_type', $set_type);
        }

        if ($period > 0) {
            $members = $members->where('period', $period);
        }

        $members = $members
            ->orderBy('created_at', 'desc')
            ->offset($offset)
            ->limit($limit)
            ->get();

        $count = DB::table('members');

        if (!empty($search)) {
            $count = $count->where('name', 'like', '%' . $search . '%')
                ->orWhere('nim', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%')
                ->orWhere('division', 'like', '%' . $search . '%');
        }

        if ($set_type > 0) {
            $count = $count->where('set_type', $set_type);
        }

        if ($period > 0) {
            $count = $count->where('period', $period);
        }

        $count = $count->count();

        $totalPages = ceil($count / $limit);

        $totalPages = $totalPages > 0 ? $totalPages : 1; // Ensure total pages is at least 1

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
            $request['set_type'] = (int)$request->input('set_type');
            $request['division'] = (int)$request->input('division');
            $request['batch_year'] = (int)$request->input('batch_year');
            $request['period'] = (int)$request->input('period');

            $request->validate([
                'nim' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'contact' => 'required|string|max:255',
                'division' => 'required|numeric',
                'set_type' => 'required|numeric',
                'batch_year' => 'required|numeric',
                'period' => 'required|numeric',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'email' => 'nullable|email|max:255',
                'instagram' => 'nullable|string|max:255',
                'linkedin' => 'nullable|string|max:255',
            ]);

            // Handle profile picture upload if provided
            if ($request->hasFile('profile_picture')) {
                $profilePicturePath = $request->file('profile_picture')->store('member-profile-pictures', 'public');
            } else {
                $profilePicturePath = null; // or set a default picture path
            }

            DB::table('members')->insert([
                'id' => Ulid::generate(),
                'nim' => $request->input('nim'),
                'name' => $request->input('name'),
                'address' => $request->input('address'),
                'contact' => $request->input('contact'),
                'division' => $request->input('division'),
                'set_type' => $request->input('set_type'),
                'batch_year' => $request->input('batch_year'),
                'period' => $request->input('period'),
                'photo_profile' => $profilePicturePath,
                'email' => $request->input('email'),
                'instagram' => $request->input('instagram'),
                'linkedin' => $request->input('linkedin'),
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
            $request['set_type'] = (int)$request->input('set_type');
            $request['division'] = (int)$request->input('division');
            $request['batch_year'] = (int)$request->input('batch_year');
            $request['period'] = (int)$request->input('period');

            $request->validate([
                'nim' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'contact' => 'required|string|max:255',
                'division' => 'required|numeric',
                'set_type' => 'required|numeric',
                'batch_year' => 'required|numeric',
                'period' => 'required|numeric',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'email' => 'nullable|email|max:255',
                'instagram' => 'nullable|string|max:255',
                'linkedin' => 'nullable|string|max:255',
            ]);

            // Handle profile picture upload if provided
            if ($request->hasFile('profile_picture')) {
                $profilePicturePath = $request->file('profile_picture')->store('member-profile-pictures', 'public');
            } else {
                $profilePicturePath = null; // or set a default picture path
            }

            DB::table('members')
                ->where('id', $id)
                ->update([
                    'nim' => $request->input('nim'),
                    'name' => $request->input('name'),
                    'address' => $request->input('address'),
                    'contact' => $request->input('contact'),
                    'division' => $request->input('division'),
                    'set_type' => $request->input('set_type'),
                    'batch_year' => $request->input('batch_year'),
                    'period' => $request->input('period'),
                    'photo_profile' => $profilePicturePath,
                    'email' => $request->input('email'),
                    'instagram' => $request->input('instagram'),
                    'linkedin' => $request->input('linkedin'),
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

    function import(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|file|mimes:csv|max:2048',
            ]);

            $file = $request->file('file');
            $fileContents = file($file->getPathname());
            $members = [];

            foreach ($fileContents as $line) {
                $data = str_getcsv($line);

                if (count($data) < 8) {
                    continue; // Skip lines with insufficient data
                }

                $line = [
                    'id' => Ulid::generate(),
                    'name' => $data[0],
                    'address' => $data[1],
                    'contact' => $data[2],
                    'division' => (int)$data[3],
                    'set_type' => (int)$data[4],
                    'batch_year' => (int)$data[5],
                    'period' => (int)$data[6],
                    'nim' => $data[7],
                    'email' => $data[8] ?? null,
                    'instagram' => $data[9] ?? null,
                    'linkedin' => $data[10] ?? null,
                    'photo_profile' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                // validate
                $validator = Validator::make($line, [
                    'nim' => 'required|string|max:255',
                    'name' => 'required|string|max:255',
                    'address' => 'required|string|max:255',
                    'contact' => 'required|string|max:255',
                    'division' => 'required|numeric',
                    'set_type' => 'required|numeric',
                    'batch_year' => 'required|numeric',
                    'period' => 'required|numeric',
                    'email' => 'nullable|email|max:255',
                    'instagram' => 'nullable|string|max:255',
                    'linkedin' => 'nullable|string|max:255',
                ]);

                if ($validator->fails()) {
                    return redirect()->route('dashboard.members')->with('error', 'Invalid data in CSV file: ' . implode(', ', $validator->errors()->all()));
                }

                $members[] = $line;
            }

            if (empty($members)) {
                return redirect()->route('dashboard.members')->with('error', 'No valid members found in the CSV file.');
            }

            DB::table('members')->insert($members);

            return redirect()->route('dashboard.members')->with('success', 'Members imported successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.members')->with('error', 'Failed to import members: ' . $e->getMessage());
        }
    }
}
