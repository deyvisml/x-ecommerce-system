<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DeliveryScheduleController;
use App\Http\Controllers\DocumentTypeController;
use App\Http\Controllers\ExchangeRateController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\NewsletterSubscriberController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDocumentController;
use App\Http\Controllers\OrderStateController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseOccasionController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Artisan;
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

Route::post('/auth/register', [RegisterController::class, 'register_user']);
Route::post('/auth/login', [LoginController::class, 'login_user']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [LogoutController::class, 'logout_user']);
    Route::get('/user', [UserController::class, 'user']);
});

Route::apiResource('categories', CategoryController::class);
Route::apiResource('collections', CollectionController::class);
Route::apiResource('document-types', DocumentTypeController::class);
Route::apiResource('regions', RegionController::class);
Route::apiResource('exchange-rates', ExchangeRateController::class);
Route::apiResource('banks', BankController::class);
Route::apiResource('states', StateController::class);
Route::apiResource('orders', OrderController::class)->except(['show']);
Route::apiResource('orders', OrderController::class)->only(['show'])->middleware('auth:sanctum');
Route::apiResource('customers', CustomerController::class);

Route::get('stores/{store_id}/customers', [CustomerController::class, 'store_customers'])->middleware('auth:sanctum');
Route::get('stores/{store_id}/customers/{customer_id}', [CustomerController::class, 'store_customer'])->middleware('auth:sanctum');

Route::put('orders/{order_id}/update-state-to-paid', [OrderController::class, 'update_state_to_paid']);

Route::get('stores/{store_id}/orders', [OrderController::class, 'store_orders'])->middleware('auth:sanctum');
Route::get('stores/{store_id}/orders/{order_id}', [OrderController::class, 'store_order'])->middleware('auth:sanctum');
Route::put('stores/{store_id}/orders/{order_id}/update-state', [OrderController::class, 'update_state'])->middleware('auth:sanctum');
Route::post('stores/{store_id}/orders/{order_id}/order-document', [OrderDocumentController::class, 'store'])->middleware('auth:sanctum');
Route::delete('stores/{store_id}/orders/{order_id}', [OrderController::class, 'destroy'])->middleware('auth:sanctum');

Route::post('stores/{store_id}/orders/{order_id}/order-state', [OrderStateController::class, 'store'])->middleware('auth:sanctum');
Route::put('stores/{store_id}/orders/{order_id}/order-state/{order_state_id}/update-state', [OrderStateController::class, 'update_state'])->middleware('auth:sanctum');

Route::apiResource('products', ProductController::class)->except(['show', 'store', 'update', 'destroy']);
Route::apiResource('products', ProductController::class)->only(['show', 'store', 'update', 'destroy'])->middleware('auth:sanctum');
Route::put('products/{product_id}/update-in-stock', [ProductController::class, 'update_in_stock'])->middleware('auth:sanctum');
Route::get('stores/{store_id}/products', [ProductController::class, 'store_products'])->middleware('auth:sanctum');

Route::apiResource('sellers', SellerController::class)->except(['store', 'update', 'destroy']);
Route::apiResource('sellers', SellerController::class)->only(['store', 'update', 'destroy'])->middleware('auth:sanctum');

Route::apiResource('stores', StoreController::class)->except(['store', 'update', 'destroy']);
Route::apiResource('stores', StoreController::class)->only(['store', 'update', 'destroy'])->middleware('auth:sanctum'); // setting which methods will be protected
Route::post('/stores/seller-store-registration', [StoreController::class, 'seller_store_registration']);
Route::post('/stores/seller-store-registration-auth', [StoreController::class, 'seller_store_registration_auth'])->middleware('auth:sanctum');
Route::put('/stores/{store_id}/change-state', [StoreController::class, 'change_state'])->middleware('auth:sanctum');
Route::get('/my-stores', [StoreController::class, 'my_stores'])->middleware('auth:sanctum');

Route::apiResource('delivery-schedules', DeliveryScheduleController::class);

Route::get('/regions/{region_id}/locations', [LocationController::class, 'locations_by_region']);

Route::get('/categories/{category_id}/products', [ProductController::class, 'products_by_category']);

Route::get('/categories/{category_id}/collections', [CollectionController::class, 'collections_by_category']);

Route::post('/mails/send-order-confirmation-mail', [MailController::class, 'send_order_confirmation_mail']);

Route::apiResource('newsletter-subscribers', NewsletterSubscriberController::class);

Route::post('/change-password-request', [PasswordController::class, 'change_password_request']);

Route::post('/verify-recovery-password-token', [PasswordController::class, 'verify_recovery_password_token']);

Route::post('/recovery-password', [PasswordController::class, 'recovery_password']);

Route::get("/purchase-occasions", [PurchaseOccasionController::class, 'index']);

// replace php artisan store:link (run after each deployment)
Route::get('/generate-link-storage', function () {
    Artisan::call('storage:link');
    echo 'ok';
});
