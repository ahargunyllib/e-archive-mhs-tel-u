<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('dashboard.home');
    })->name('dashboard');

    Route::get('/dashboard/home', function () {
        return Inertia::render('dashboard/home');
    })->name('dashboard.home');

    Route::get('/dashboard/users', [UserController::class, 'index'])->name('dashboard.users');
    Route::get('/dashboard/users/create', [UserController::class, 'create'])->name('dashboard.users.create');
    Route::post('/dashboard/users', [UserController::class, 'store'])->name('dashboard.users.store');
    Route::get('/dashboard/users/{id}/edit', [UserController::class, 'edit'])->name('dashboard.users.edit');
    Route::put('/dashboard/users/{id}', [UserController::class, 'update'])->name('dashboard.users.update');
    Route::delete('/dashboard/users/{id}', [UserController::class, 'delete'])->name('dashboard.users.delete');

    Route::get('/dashboard/members', [MemberController::class, 'index'])->name('dashboard.members');
    Route::get('/dashboard/members/create', [MemberController::class, 'create'])->name('dashboard.members.create');
    Route::post('/dashboard/members', [MemberController::class, 'store'])->name('dashboard.members.store');
    Route::get('/dashboard/members/{id}', [MemberController::class, 'show'])->name('dashboard.members.show');
    Route::get('/dashboard/members/{id}/edit', [MemberController::class, 'edit'])->name('dashboard.members.edit');
    Route::put('/dashboard/members/{id}', [MemberController::class, 'update'])->name('dashboard.members.update');
    Route::delete('/dashboard/members/{id}', [MemberController::class, 'delete'])->name('dashboard.members.delete');

    Route::get('/dashboard/agendas', function () {
        return Inertia::render('dashboard/agendas');
    })->name('dashboard.agendas');

    Route::get('/dashboard/agendas/create', function () {
        return Inertia::render('dashboard/create-agenda');
    })->name('dashboard.agendas.create');

    Route::get('/dashboard/achievements', function () {
        return Inertia::render('dashboard/achievements');
    })->name('dashboard.achievements');

    Route::get('/dashboard/achievements/create', function () {
        return Inertia::render('dashboard/create-achievement');
    })->name('dashboard.achievements.create');

    Route::get('/dashboard/profile', [ProfileController::class, 'index'])
        ->name('dashboard.profile');
    Route::post('/dashboard/profile', [ProfileController::class, 'update'])
        ->name('dashboard.profile.update');
});

require __DIR__ . '/auth.php';
