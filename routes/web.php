<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Basic\ApiGenericController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $class = new ApiGenericController;
    $flavours = $class->get_all_flavours();
    return view('welcome',['flavours'=>$flavours->getData()->response]);
});
Route::get('/signup', function () {
    return view('react');
});
Route::get('/signin', function () {
    return view('react');
});
Route::get('/adminlogin', function () {
    return view('react_dashboard');
});
Route::get('/activate/{path?}', function () {
    return view('react');
})->where('path', '.*');

Route::get('/dashboard/{path?}', function () {
    return view('react_dashboard');
})->where('path', '.*');
Route::get('/admindashboard/{path?}', function () {
    return view('react_dashboard');
})->where('path', '.*');
