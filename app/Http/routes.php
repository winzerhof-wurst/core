<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */

Route::get('/', [
    'uses' => 'PageController@index',
]);

Route::resource('api/orders', 'OrderController', ['only' => [
        'store'
]]);
Route::resource('api/tidbits', 'TidbitController', ['only' => [
        'index'
]]);
Route::resource('api/wines', 'WineController', ['only' => [
        'index'
]]);
