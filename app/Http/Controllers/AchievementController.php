<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Uid\Ulid;

class AchievementController extends Controller
{
    function index(Request $request)
    {
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);

        $offset = ($page - 1) * $limit;
        $achievements = DB::table('achievements')
            ->select([
                "id",
                "name",
                "date",
                "type",
                "set_type",
                "certificate",
                "created_at",
                "updated_at",
            ])
            ->orderBy('created_at', 'desc')
            ->offset($offset)
            ->limit($limit)
            ->get();

        $count = DB::table('achievements')->count();

        $totalPages = ceil($count / $limit);

        return inertia('dashboard/achievements', [
            'achievements' => $achievements,
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
        $achievement = DB::table('achievements')->where('id', $id)->first();

        if (!$achievement) {
            return redirect()->route('dashboard.achievements')->with('error', 'Achievement not found.');
        }

        return inertia('dashboard/achievement', [
            'achievement' => $achievement,
        ]);
    }

    function create()
    {
        return inertia('dashboard/create-achievement');
    }

    function store(Request $request)
    {
        try {
            $request['set_type'] = (int)$request->input('set_type');
            $request['type'] = (int)$request->input('type');

            $request->validate([
                'name' => 'required|string|max:255',
                'date' => 'required|date',
                'type' => 'required|numeric',
                'set_type' => 'required|numeric',
                'certificate' => 'required|mimes:pdf,doc,docx,jpeg,png,jpg,gif,svg|max:10240',
            ]);

            if ($request->hasFile('certificate')) {
                $path = $request->file('certificate')->store('certificates', 'public');
                $request['certificate'] = $path;
            }

            DB::table('achievements')->insert([
                'id' => Ulid::generate(),
                'name' => $request->input('name'),
                'date' => $request->input('date'),
                'type' => $request->input('type'),
                'set_type' => $request->input('set_type'),
                'certificate' => $request->input('certificate'),
            ]);

            return redirect()->route('dashboard.achievements')->with('success', 'Achievement created successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.achievements.create')->with('error', 'Failed to create achievement: ' . $e->getMessage());
        }
    }

    function edit(Request $request, $id)
    {
        $achievement = DB::table('achievements')->where('id', $id)->first();

        if (!$achievement) {
            return redirect()->route('dashboard.achievements')->with('error', 'Achievement not found.');
        }

        return inertia('dashboard/edit-achievement', [
            'achievement' => $achievement,
        ]);
    }

    function update(Request $request, $id)
    {
        try {
            $request['set_type'] = (int)$request->input('set_type');
            $request['type'] = (int)$request->input('type');

            $request->validate([
                'name' => 'required|string|max:255',
                'date' => 'required|date',
                'type' => 'required|numeric',
                'set_type' => 'required|numeric',
                'certificate' => 'required|mimes:pdf,doc,docx,jpeg,png,jpg,gif,svg|max:10240',
            ]);

            if ($request->hasFile('certificate')) {
                $path = $request->file('certificate')->store('certificates', 'public');
                $request['certificate'] = $path;
            }

            DB::table('achievements')
                ->where('id', $id)
                ->update([
                    'name' => $request->input('name'),
                    'date' => $request->input('date'),
                    'type' => $request->input('type'),
                    'set_type' => $request->input('set_type'),
                    'certificate' => $request->input('certificate'),
                ]);

            return redirect()->route('dashboard.achievements')->with('success', 'Achievement updated successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.achievements.edit', ['id' => $id])->with('error', 'Failed to update achievement: ' . $e->getMessage());
        }
    }

    function delete(Request $request, $id)
    {
        try {
            DB::table('achievements')->where('id', $id)->delete();
            return redirect()->route('dashboard.achievements')->with('success', 'Achievement deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.achievements')->with('error', 'Failed to delete achievement: ' . $e->getMessage());
        }
    }
}
