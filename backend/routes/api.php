<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DeliveryScheduleController;
use App\Http\Controllers\DocumentTypeController;
use App\Http\Controllers\ExchangeRateController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\RegionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('product-types', ProductTypeController::class);
Route::apiResource('document-types', DocumentTypeController::class);
Route::apiResource('regions', RegionController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('exchange-rates', ExchangeRateController::class);

Route::apiResource('delivery-schedules', DeliveryScheduleController::class);

Route::get('/regions/{region_id}/locations', [LocationController::class, 'locations_by_region']);

Route::get('/categories/{category_id}/products', [ProductController::class, 'products_by_category']);

Route::get('/categories/{category_id}/product-types', [ProductTypeController::class, 'product_types_by_category']);

Route::post('/mails/send-order-confirmation-mail', [MailController::class, 'send_order_confirmation_mail']);
