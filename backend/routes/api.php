<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TesteController;

Route::post('/user', [UserController::class, 'store']);
Route::post('refresh-token', [AuthController::class, 'refreshToken']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/companies', [CompanyController::class, 'store']);

//Criar rotas privadas que só podem ser acessadas por usuário logado

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/teste', [TesteController::class, 'index']);
    Route::get('/users', [UserController::class, 'getUsers']);
});
