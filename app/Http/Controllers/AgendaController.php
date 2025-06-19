<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Uid\Ulid;

class AgendaController extends Controller
{
    function index(Request $request)
    {
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);

        $offset = ($page - 1) * $limit;
        $agendas = DB::table('agendas')
            ->select([
                "id",
                "name",
                "description",
                "date",
                "work_program",
                "set_type",
                "relationship",
                "estimated_cost",
                "proposal",
                "report",
                "status",
                "created_at",
                "updated_at",
            ])
            ->orderBy('created_at', 'desc')
            ->offset($offset)
            ->limit($limit)
            ->get();

        $count = DB::table('agendas')->count();

        $totalPages = ceil($count / $limit);

        return inertia('dashboard/agendas', [
            'agendas' => $agendas,
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
        $agenda = DB::table('agendas')->where('id', $id)->first();

        if (!$agenda) {
            return redirect()->route('dashboard.agendas')->with('error', 'Agenda not found.');
        }

        return inertia('dashboard/agenda', [
            'agenda' => $agenda,
        ]);
    }

    function create()
    {
        return inertia('dashboard/create-agenda');
    }

    function store(Request $request)
    {
        try {
            $request['set_type'] = (int)$request->input('set_type');
            $request['status'] = (int)$request->input('status');

            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'date' => 'required|date',
                'work_program' => 'required|string|max:255',
                'set_type' => 'required|numeric',
                'relationship' => 'required|string|max:255',
                'estimated_cost' => 'required|numeric',
                'proposal' => 'nullable|mimes:pdf,doc,docx|max:10240',
                'report' => 'nullable|mimes:pdf,doc,docx|max:10240',
                'status' => 'required|numeric',
            ]);

            if ($request->hasFile('proposal')) {
                $path = $request->file('proposal')->store('proposals', 'public');
                $request['proposal'] = $path;
            }

            if ($request->hasFile('report')) {
                $path = $request->file('report')->store('reports', 'public');
                $request['report'] = $path;
            }

            DB::table('agendas')->insert([
                'id' => Ulid::generate(),
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'date' => $request->input('date'),
                'work_program' => $request->input('work_program'),
                'set_type' => $request->input('set_type'),
                'relationship' => $request->input('relationship'),
                'estimated_cost' => $request->input('estimated_cost'),
                'proposal' => $request->input('proposal'),
                'report' => $request->input('report'),
                'status' => $request->input('status'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect()->route('dashboard.agendas')->with('success', 'Agenda created successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.agendas.create')->with('error', 'Failed to create agenda: ' . $e->getMessage());
        }
    }

    function edit(Request $request, $id)
    {
        $agenda = DB::table('agendas')->where('id', $id)->first();

        if (!$agenda) {
            return redirect()->route('dashboard.agendas')->with('error', 'Agenda not found.');
        }

        return inertia('dashboard/edit-agenda', [
            'agenda' => $agenda,
        ]);
    }

    function update(Request $request, $id)
    {
        try {
            $request['set_type'] = (int)$request->input('set_type');
            $request['status'] = (int)$request->input('status');

            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'date' => 'required|date',
                'work_program' => 'required|string|max:255',
                'set_type' => 'required|numeric',
                'relationship' => 'required|string|max:255',
                'estimated_cost' => 'required|numeric',
                'proposal' => 'nullable|mimes:pdf,doc,docx|max:10240',
                'report' => 'nullable|mimes:pdf,doc,docx|max:10240',
                'status' => 'required|numeric',
            ]);

            if ($request->hasFile('proposal')) {
                $path = $request->file('proposal')->store('proposals', 'public');
                $request['proposal'] = $path;
            }

            if ($request->hasFile('report')) {
                $path = $request->file('report')->store('reports', 'public');
                $request['report'] = $path;
            }

            DB::table('agendas')
                ->where('id', $id)
                ->update([
                    'name' => $request->input('name'),
                    'description' => $request->input('description'),
                    'date' => $request->input('date'),
                    'work_program' => $request->input('work_program'),
                    'set_type' => $request->input('set_type'),
                    'relationship' => $request->input('relationship'),
                    'estimated_cost' => $request->input('estimated_cost'),
                    'proposal' => $request->input('proposal'),
                    'report' => $request->input('report'),
                    'status' => $request->input('status'),
                    'updated_at' => now(),
                ]);

            return redirect()->route('dashboard.agendas')->with('success', 'Agenda updated successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.agendas.edit', ['id' => $id])->with('error', 'Failed to update agenda: ' . $e->getMessage());
        }
    }

    function delete(Request $request, $id)
    {
        try {
            DB::table('agendas')->where('id', $id)->delete();
            return redirect()->route('dashboard.agendas')->with('success', 'Agenda deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard.agendas')->with('error', 'Failed to delete agenda: ' . $e->getMessage());
        }
    }
}
