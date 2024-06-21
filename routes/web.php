<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/', [PostController::class, 'index'])->name('welcome');
    Route::get('/dashboard', [PostController::class, 'dashboard'])->name('dashboard');
    Route::put('/post/update', [PostController::class, 'update'])->name('update');
    Route::delete('/post/delete', [PostController::class, 'delete'])->name('delete');
    Route::post('/post/add', [PostController::class, 'store'])->name('add');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
