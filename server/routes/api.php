<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Created by Reda , this is admin 

Route::get('auth/google', [ClientController::class, 'redirectToGoogle']);
Route::get('/Signin_user/google', [ClientController::class, 'handleGoogleCallback']);


Route::post('/add_product', [ProductController::class, 'add_product']);
Route::post('/update_products/{id}', [ProductController::class, 'update']);
Route::get('/show_product', [ProductController::class, 'show_product']);
Route::delete('/delete_product/{id}', [ProductController::class, 'delete']);
Route::post('/add_categories', [ProductController::class, 'add_categories']);
Route::get('/info_categories', [ProductController::class, 'info_categories']);
Route::get('/ProductsCustomer_all', [ProductController::class, 'ProductsCustomer_all']);
Route::delete('/delete_categorie/{id}', [ProductController::class, 'delete_categorie']);
Route::post('/add_flavors', [ProductController::class, 'add_flavors']);
Route::get('/info_flavors', [ProductController::class, 'info_flavors']);


// Route to get the products for the form
Route::get('/Deals_products', [ProductController::class, 'showAddDealForm']);


// Route to handle the form submission
Route::post('/add-deal', [ProductController::class, 'ADD_DEAL']);
Route::get('/index_Deals', [ProductController::class, 'index_Deals']);

Route::get('/Show_orders', [OrderController::class, 'index']);
Route::get('/Show_orders_all', [OrderController::class, 'Show_orders_all']);
Route::get('/Show_order_id/{id}', [OrderController::class, 'Show_order_id']);
Route::post('/update_order_status/{id}', [OrderController::class, 'update_order_status']);

Route::get('/getSalesData', [OrderController::class, 'getSalesData']);
Route::get('/Show_Customers', [ClientController::class, 'Show_Customers']);
Route::delete('/delete_flavor/{id}', [ProductController::class, 'delete_flavor']);
Route::get('/info_admin', [AdminController::class, 'show']);
Route::post('/login_user', [ClientController::class, 'login_user']);
Route::post('/Signin_user', [ClientController::class, 'Signin_user']);
Route::get('/Show_Customer_all', [ClientController::class, 'Show_Customer_all']);

Route::get('/Requests_all', [OrderController::class, 'Requests_all']);
Route::get('/getTotalQuantity', [OrderController::class, 'getTotalQuantity']);
Route::get('/getTotalRevenue', [OrderController::class, 'getTotalRevenue']);

Route::get('/Search_ProductsCustomer/{search}', [ProductController::class, 'search_Pro']);


Route::get('/increment', [ClientController::class, 'increment']);
Route::get('/daily-visits', [ClientController::class, 'getDailyVisits']);
Route::post('/login', [AdminController::class, 'login']);






// Created By Salah this is client  
Route::get('/product/{id}', [ProductController::class, 'getProductByIdUpdate']);
Route::get('/products/featured-products', [ProductController::class, 'getHomeProduct']);
Route::get('/products/{category}', [ProductController::class, 'getProductsByCategory']);
Route::get('/products/all_products', [ProductController::class, 'getProductsByCategory']);
Route::get('/products/all_deals', [ProductController::class, 'getProductsByCategory']);
Route::get('/product/{id}', [ProductController::class, 'getProductById']);
Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::patch('/orders/{id}/cancel', [OrderController::class, 'cancel']);

Route::get('/client', [ClientController::class, 'getClientInfo']);
Route::get('/client-by-token', [ClientController::class, 'getClientByToken']);
