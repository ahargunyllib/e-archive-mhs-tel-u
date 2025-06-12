<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/home', function () {
        return Inertia::render('dashboard/home');
    })->name('dashboard.home');
});

require __DIR__.'/auth.php';
