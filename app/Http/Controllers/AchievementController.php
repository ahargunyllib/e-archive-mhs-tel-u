<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Uid\Ulid;

class AchievementController extends Controller
{
    function index(Request $request)
    {
        $page = (int)$request->input('page', 1);
        $limit = (int)$request->input('limit', 10);
        $search = $request->input('search', '');
        $set_type = (int)$request->input('set_type', 0);
        $period = $request->input('period', '0');
        $year = $request->input('year', '');

        if (!empty($period)) {
            switch ($period) {
                case 1:
                    $startYear = 2020;
                    $endYear = 2021;
                    break;
                case 2:
                    $startYear = 2021;
                    $endYear = 2022;
                    break;
                case 3:
                    $startYear = 2022;
                    $endYear = 2023;
                    break;
                case 4:
                    $startYear = 2023;
                    $endYear = 2024;
                    break;
                case 5:
                    $startYear = 2024;
                    $endYear = 2025;
                    break;
            }
        }

        $offset = ($page - 1) * $limit;
        $achievements = DB::table('achievements')
            ->select([
                "id",
                "name",
                "date",
                "type",
                "set_type",
                "certificate",
                "file",
                "achiever",
                "member",
                "created_at",
                "updated_at",
            ]);

        if (!empty($search)) {
            $achievements = $achievements->where('name', 'like', '%' . $search . '%');
        }

        if ($set_type > 0) {
            $achievements = $achievements->where('set_type', $set_type);
        }

        if (!empty($startYear) && !empty($endYear)) {
            $achievements = $achievements
                ->whereBetween('date', ["$startYear-01-01", "$endYear-12-31"]);
        }

        if (!empty($year)) {
            $achievements = $achievements->whereYear('date', $year);
        }

        $achievements = $achievements
            ->orderBy('created_at', 'desc')
            ->offset($offset)
            ->limit($limit)
            ->get();

        $count = DB::table('achievements');

        if (!empty($search)) {
            $count = $count->where('name', 'like', '%' . $search . '%');
        }

        if ($set_type > 0) {
            $count = $count->where('set_type', $set_type);
        }

        if (!empty($startYear) && !empty($endYear)) {
            $count = $count
                ->whereBetween('date', ["$startYear-01-01", "$endYear-12-31"]);
        }

        if (!empty($year)) {
            $count = $count->whereYear('date', $year);
        }

        $count = $count->count();

        $totalPages = ceil($count / $limit);

        $totalPages = $totalPages > 0 ? $totalPages : 1; // Ensure total pages is at least 1

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
                'file' => 'nullable|mimes:pdf,doc,docx,jpeg,png,jpg,gif,svg|max:10240',
                'achiever' => 'required|string|max:255',
                'member' => 'nullable|string|max:255',
            ]);

            if ($request->hasFile('certificate')) {
                $path = $request->file('certificate')->store('certificates', 'public');
                $request['certificate'] = $path;
            }

            if ($request->hasFile('file')) {
                $filePath = $request->file('file')->store('files', 'public');
                $request['file'] = $filePath;
            } else {
                $request['file'] = null; // Ensure file is set to null if not provided
            }

            DB::table('achievements')->insert([
                'id' => Ulid::generate(),
                'name' => $request->input('name'),
                'date' => $request->input('date'),
                'type' => $request->input('type'),
                'set_type' => $request->input('set_type'),
                'certificate' => $request->input('certificate'),
                'file' => $request->input('file'),
                'achiever' => $request->input('achiever'),
                'member' => $request->input('member'),
                'created_at' => now(),
                'updated_at' => now(),
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
                'file' => 'nullable|mimes:pdf,doc,docx,jpeg,png,jpg,gif,svg|max:10240',
                'achiever' => 'required|string|max:255',
                'member' => 'nullable|string|max:255',
            ]);

            if ($request->hasFile('certificate')) {
                $path = $request->file('certificate')->store('certificates', 'public');
                $request['certificate'] = $path;
            }

            if ($request->hasFile('file')) {
                $filePath = $request->file('file')->store('files', 'public');
                $request['file'] = $filePath;
            } else {
                $request['file'] = null; // Ensure file is set to null if not provided
            }

            DB::table('achievements')
                ->where('id', $id)
                ->update([
                    'name' => $request->input('name'),
                    'date' => $request->input('date'),
                    'type' => $request->input('type'),
                    'set_type' => $request->input('set_type'),
                    'certificate' => $request->input('certificate'),
                    'file' => $request->input('file'),
                    'achiever' => $request->input('achiever'),
                    'member' => $request->input('member'),
                    'updated_at' => now(),
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
