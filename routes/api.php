<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['json.response']], function () {
Route::post('/v1/register', 'Auth\UserAuthController@register');
Route::post('/v1/login', 'Auth\UserAuthController@login');
Route::post('/v1/adminlogin', 'Auth\AdminAuthController@login');
Route::get('/v1/activate', 'Auth\UserAuthController@confirm_activation_id');
Route::post('/v1/update_password_status', 'Auth\UserAuthController@update_password_status');
Route::get('/v1/get_all_states', 'Basic\ApiGenericController@get_all_states');
Route::get('/v1/get_all_flavours', 'Basic\ApiGenericController@get_all_flavours');
Route::get('/v1/verify_paystack_payment', 'Basic\ApiGenericController@verify_paystack_payment');
//Route::post('/v1/save_order', 'Auth\OrdersAuthController@create');
Route::post('/v1/refresh_token', 'Auth\UserAuthController@get_refresh_access_token');
Route::post('/v1/contact_message', 'Basic\ApiGenericController@send_contact_message');
Route::post('/v1/create_flavour', 'Auth\FlavoursAuthController@create');

});


Route::prefix('v1')->middleware(['auth:api','json.response'])->group(function () {
//Route::middleware('auth:api')->group(function () {
    // our routes to be protected will go in here
    Route::get('logout', 'Auth\UserAuthController@logout')->name('logout.api');
    Route::get('user', 'Auth\UserAuthController@user');
    Route::get('orders', 'Auth\OrdersAuthController@get_pending_or_completed_orders');
    Route::post('save_order', 'Auth\OrdersAuthController@create');
    
    Route::post('create_support_ticket', 'Auth\TicketAuthController@create');
    Route::get('tickets', 'Auth\TicketAuthController@get_user_tickets');
    Route::get('admins', 'Auth\AdminAuthController@get_all_admins');
    Route::post('create_admin', 'Auth\AdminAuthController@register');
    Route::get('disable_enable', 'Auth\CommonAuthController@disable_enable');
    Route::get('distributors', 'Auth\UserAuthController@get_all_distributors');
    Route::get('distributor', 'Auth\UserAuthController@get_distributor_details');
    Route::get('get_all_transactions', 'Auth\OrdersAuthController@get_all_transactions');
    Route::delete('delete_flavour','Auth\FlavoursAuthController@destroy');
//});
});

Route::prefix('v1')->middleware(['auth:admin','json.response'])->group(function () {
    Route::get('/admin', function (Request $request) {
        return response($request->user(), 200);
    //return response()->json([ 'valid' => auth()->check()]);
    });
    Route::get('get_user_orders','Auth\OrdersAuthController@get_user_orders');
});
// Route::prefix('v1')->group(['middleware' => ['json.response','cors','cassanovas_header']],function () {
// Route::get('/logout', function () {
//     return response()->json([ 'valid' => auth()->check()]);
// });

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     //return "got here";
//     return $request->user();
// });

// });


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

