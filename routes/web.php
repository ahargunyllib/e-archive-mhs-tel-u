<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AchievementController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('dashboard.home');
    })->name('dashboard');

    Route::get('/dashboard/home', function (Request $request) {
        $period = (int) $request->get('period', '0');

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

        $currYear = now()->year;

        $totalMembers = DB::table('members');

        if (!empty($startYear) && !empty($endYear)) {
            $totalMembers = $totalMembers->where('period', $period);
        }
        $totalMembers = $totalMembers->count();

        $totalAgendas = DB::table('agendas');

        if (!empty($startYear) && !empty($endYear)) {
            $totalAgendas = $totalAgendas
                ->whereDate('start_date', '>=', "$startYear-01-01")
                ->whereDate('end_date', '<=', "$endYear-12-31");
        }
        $totalAgendas = $totalAgendas->count();

        $totalAchievements = DB::table('achievements');

        if (!empty($startYear) && !empty($endYear)) {
            $totalAchievements = $totalAchievements
                ->whereBetween('date', ["$startYear-01-01", "$endYear-12-31"]);
        }
        $totalAchievements = $totalAchievements->count();

        $totalProposals = DB::table('agendas')
            ->whereNotNull('proposal')
            ->whereNotNull('report');

        if (!empty($startYear) && !empty($endYear)) {
            $totalProposals = $totalProposals
                ->whereDate('start_date', '>=', "$startYear-01-01")
                ->whereDate('end_date', '<=', "$endYear-12-31");
        }
        $totalProposals = $totalProposals->count();

        $date = $request->get('date', now()->format('Y-m-d'));
        $agendas = DB::table('agendas')
            ->whereDate('start_date', '<=', $date)
            ->whereDate('end_date', '>=', $date)
            ->orderBy('created_at', 'desc')
            ->get();

        $achievementStatistics = DB::table('achievements')
            ->select(DB::raw('COUNT(*) as count, EXTRACT(year FROM date) as year, type'));

        if (!empty($startYear) && !empty($endYear)) {
            $achievementStatistics = $achievementStatistics
                ->whereBetween('date', ["$startYear-01-01", "$endYear-12-31"]);
        }
        $achievementStatistics = $achievementStatistics
            ->orderBy('year', 'desc')
            ->groupBy('year', 'type')
            ->get();

        $agendaProgresses = DB::table('agendas');

        if (!empty($startYear) && !empty($endYear)) {
            $agendaProgresses = $agendaProgresses
                ->whereDate('start_date', '>=', "$startYear-01-01")
                ->whereDate('end_date', '<=', "$endYear-12-31");
        }
        $agendaProgresses = $agendaProgresses
            ->whereIn('status', [1, 3])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/home', [
            'totalMembers' => $totalMembers,
            'totalAgendas' => $totalAgendas,
            'totalAchievements' => $totalAchievements,
            'totalProposals' => $totalProposals,
            'agendas' => $agendas,
            'achievementStatistics' => $achievementStatistics,
            'agendaProgresses' => $agendaProgresses,
        ]);
    })->name('dashboard.home');

    Route::get('/dashboard/members', [MemberController::class, 'index'])->name('dashboard.members');
    Route::get('/dashboard/members/create', [MemberController::class, 'create'])->name('dashboard.members.create');
    Route::post('/dashboard/members', [MemberController::class, 'store'])->name('dashboard.members.store');
    Route::get('/dashboard/members/{id}', [MemberController::class, 'show'])->name('dashboard.members.show');
    Route::get('/dashboard/members/{id}/edit', [MemberController::class, 'edit'])->name('dashboard.members.edit');
    Route::post('/dashboard/members/import', [MemberController::class, 'import'])->name('dashboard.members.import');
    Route::post('/dashboard/members/{id}', [MemberController::class, 'update'])->name('dashboard.members.update');
    Route::delete('/dashboard/members/{id}', [MemberController::class, 'delete'])->name('dashboard.members.delete');

    Route::get('/dashboard/agendas', [AgendaController::class, 'index'])->name('dashboard.agendas');
    Route::get('/dashboard/agendas/create', [AgendaController::class, 'create'])->name('dashboard.agendas.create');
    Route::post('/dashboard/agendas', [AgendaController::class, 'store'])->name('dashboard.agendas.store');
    Route::get('/dashboard/agendas/{id}', [AgendaController::class, 'show'])->name('dashboard.agendas.show');
    Route::get('/dashboard/agendas/{id}/edit', [AgendaController::class, 'edit'])->name('dashboard.agendas.edit');
    Route::post('/dashboard/agendas/{id}', [AgendaController::class, 'update'])->name('dashboard.agendas.update');
    Route::delete('/dashboard/agendas/{id}', [AgendaController::class, 'delete'])->name('dashboard.agendas.delete');

    Route::get('/dashboard/achievements', [AchievementController::class, 'index'])->name('dashboard.achievements');
    Route::get('/dashboard/achievements/create', [AchievementController::class, 'create'])->name('dashboard.achievements.create');
    Route::post('/dashboard/achievements', [AchievementController::class, 'store'])->name('dashboard.achievements.store');
    Route::get('/dashboard/achievements/{id}', [AchievementController::class, 'show'])->name('dashboard.achievements.show');
    Route::get('/dashboard/achievements/{id}/edit', [AchievementController::class, 'edit'])->name('dashboard.achievements.edit');
    Route::post('/dashboard/achievements/{id}', [AchievementController::class, 'update'])->name('dashboard.achievements.update');
    Route::delete('/dashboard/achievements/{id}', [AchievementController::class, 'delete'])->name('dashboard.achievements.delete');

    Route::get('/dashboard/profile', [ProfileController::class, 'index'])
        ->name('dashboard.profile');
    Route::post('/dashboard/profile', [ProfileController::class, 'update'])
        ->name('dashboard.profile.update');
});

Route::middleware(['auth', 'role:1'])->group(function () {
    Route::get('/dashboard/users', [UserController::class, 'index'])->name('dashboard.users');
    Route::get('/dashboard/users/create', [UserController::class, 'create'])->name('dashboard.users.create');
    Route::post('/dashboard/users', [UserController::class, 'store'])->name('dashboard.users.store');
    Route::get('/dashboard/users/{id}/edit', [UserController::class, 'edit'])->name('dashboard.users.edit');
    Route::post('/dashboard/users/{id}', [UserController::class, 'update'])->name('dashboard.users.update');
    Route::delete('/dashboard/users/{id}', [UserController::class, 'delete'])->name('dashboard.users.delete');
});

require __DIR__ . '/auth.php';
