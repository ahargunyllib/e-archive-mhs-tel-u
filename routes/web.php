<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
Route::get('/dashboard', function () {
    return redirect()->route('dashboard.home');
})->name('dashboard');

Route::get('/dashboard/home', function () {
    return Inertia::render('dashboard/home');
})->name('dashboard.home');

Route::get('/dashboard/users', function () {
    return Inertia::render('dashboard/users');
})->name('dashboard.users');

Route::get('/dashboard/users/create', function () {
    return Inertia::render('dashboard/create-user');
})->name('dashboard.users.create');

Route::get('/dashboard/members', function () {
    return Inertia::render('dashboard/members');
})->name('dashboard.members');

Route::get('/dashboard/members/create', function () {
    return Inertia::render('dashboard/create-member');
})->name('dashboard.members.create');

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

Route::get('/dashboard/profile', function () {
    return Inertia::render('dashboard/profile');
})->name('dashboard.profile');
// });

require __DIR__ . '/auth.php';
