<?php

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

    Route::get('/dashboard/users', function () {
        return Inertia::render('dashboard/users');
    })->name('dashboard.users');
});

require __DIR__ . '/auth.php';
