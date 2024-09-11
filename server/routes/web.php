<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

use App\Http\Controllers\ClientController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/products/featured-products', [ProductController::class, 'getHomeProduct']);
Route::get('/products/{category}', [ProductController::class, 'getProductsByCategory']);
Route::get('/product/{id}', [ProductController::class, 'getProductById']);
Route::get('/set-cookie', function () {
    $cookie = cookie('user_name', 'John Doe', 60); // Name, Value, Minutes

    return response('Cookie has been set')->cookie($cookie);
});
