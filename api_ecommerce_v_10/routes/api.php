<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Sales\SalesController;
use App\Http\Controllers\Slider\SliderController;
use App\Http\Controllers\Ecommerce\HomeController;
use App\Http\Controllers\Cupones\CuponesController;
use App\Http\Controllers\Product\ProductGController;
use App\Http\Controllers\Discount\DiscountController;
use App\Http\Controllers\Product\CategorieController;
use App\Http\Controllers\Ecommerce\Sale\SaleController;
use App\Http\Controllers\Product\ProductImagensController;
use App\Http\Controllers\Ecommerce\Cart\CartShopController;
use App\Http\Controllers\Ecommerce\Cart\WishListController;
use App\Http\Controllers\Ecommerce\Profile\ReviewController;
use App\Http\Controllers\Ecommerce\Profile\ProfileController;
use App\Http\Controllers\Product\ProductSizeColorsController;
use App\Http\Controllers\Ecommerce\Client\AddressUserController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\ModerationController;
use App\Http\Controllers\Tenant\LiveEventController;
use App\Http\Controllers\Tenant\QuestionController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'prefix' => 'users'
], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login_ecommerce', [AuthController::class, 'login_ecommerce']);
    Route::post('/login_social', [AuthController::class, 'login_social']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->name('me');

    Route::group(['prefix' => 'admin'], function () {
        Route::get('/all', [UserController::class, 'index']);
        Route::post('/register', [UserController::class, 'store']);
        Route::put('/update/{id}', [UserController::class, 'update']);
        Route::delete('/delete/{id}', [UserController::class, 'destroy']);
    });
});


Route::group(['prefix' => 'products'], function ($router) {
    Route::get("/get_info", [ProductGController::class, 'get_info']);
    Route::post("/add", [ProductGController::class, 'store']);
    Route::post("/update/{id}", [ProductGController::class, 'update']);
    Route::get("/all", [ProductGController::class, 'index']);
    Route::get("/show_product/{id}", [ProductGController::class, 'show']);
    Route::group(["prefix" => "inventario"], function () {
        Route::post("/add", [ProductSizeColorsController::class, 'store']);
        Route::put("/update_size/{id}", [ProductSizeColorsController::class, 'update_size']);
        Route::delete("/delete_size/{id}", [ProductSizeColorsController::class, 'destroy_size']);
        //
        Route::put("/update/{id}", [ProductSizeColorsController::class, 'update']);
        Route::delete("/delete/{id}", [ProductSizeColorsController::class, 'destroy']);
    });
    Route::group(["prefix" => "imgs"], function () {
        Route::post("/add", [ProductImagensController::class, 'store']);
        Route::delete("/delete/{id}", [ProductImagensController::class, 'destroy']);
    });
    Route::group(["prefix" => "categories"], function () {
        Route::get("/all", [CategorieController::class, 'index']);
        Route::post("/add", [CategorieController::class, 'store']);
        Route::post("/update/{id}", [CategorieController::class, 'update']);
        Route::delete("/delete/{id}", [CategorieController::class, 'destroy']);
    });
});
Route::group(['prefix' => 'sliders'], function ($router) {
    Route::get("/all", [SliderController::class, 'index']);
    Route::post("/add", [SliderController::class, 'store']);
    Route::post("/update/{id}", [SliderController::class, 'update']);
    Route::delete("/delete/{id}", [SliderController::class, 'destroy']);
});
Route::group(['prefix' => 'cupones'], function ($router) {
    Route::get("/all", [CuponesController::class, 'index']);
    Route::get("/config_all", [CuponesController::class, 'config_all']);
    Route::get("/show/{id}", [CuponesController::class, 'show']);
    Route::post("/add", [CuponesController::class, 'store']);
    Route::post("/update/{id}", [CuponesController::class, 'update']);
    Route::delete("/delete/{id}", [CuponesController::class, 'destroy']);
});

Route::group(['prefix' => 'descuentos'], function ($router) {
    Route::get("/all", [DiscountController::class, 'index']);
    Route::get("/show/{id}", [DiscountController::class, 'show']);
    Route::post("/add", [DiscountController::class, 'store']);
    Route::put("/update/{id}", [DiscountController::class, 'update']);
    Route::delete("/delete/{id}", [DiscountController::class, 'destroy']);
});

// Route::get("sale_mail/{id}","Ecommerce\Sale\SaleController@send_email");

Route::post("sales/all", [SalesController::class, 'sale_all']);

Route::group(["prefix" => "ecommerce"], function ($router) {
    Route::get("home", [HomeController::class, 'home']);
    Route::post("list-products", [HomeController::class, 'list_product']);
    Route::get("detail-product/{slug}", [HomeController::class, 'detail_product']);
    Route::get("config_initial_filter", [HomeController::class, 'config_initial_filter']);
    Route::group(["prefix" => "cart"], function () {
        Route::get("applycupon/{cupon}", [CartShopController::class, 'apply_cupon']);
        Route::resource("add", CartShopController::class);
    });
    Route::resource("wishlist", WishListController::class);
    Route::group(["prefix" => "checkout"], function () {
        Route::resource("address_user", AddressUserController::class);
        Route::post("sale", [SaleController::class, 'store']);
    });
    Route::group(["prefix" => "profile"], function () {
        Route::get("home", [ProfileController::class, 'index']);
        Route::post("profile_update", [ProfileController::class, 'profile_update']);
        Route::resource("reviews", ReviewController::class);
    });
});

Route::group(['middleware' => ['auth:api', 'super.admin'], 'prefix' => 'admin'], function () {
    Route::resource('companies', CompanyController::class);
    Route::post('companies/{id}/status', [ModerationController::class, 'toggleCompanyStatus']);
    Route::post('products/{id}/status', [ModerationController::class, 'toggleProductStatus']);
});

Route::group(['middleware' => ['auth:api', 'tenant'], 'prefix' => 'tenant'], function () {
    Route::resource('live-events', LiveEventController::class);
    Route::get('questions', [QuestionController::class, 'index']);
    Route::post('questions/{id}/answer', [QuestionController::class, 'answer']);
});