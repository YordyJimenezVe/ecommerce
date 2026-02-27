<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
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
use App\Http\Controllers\Support\SupportTicketController;

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
    Route::post('/forgot-password', [\App\Http\Controllers\Auth\PasswordResetController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::post('/reset-password', [\App\Http\Controllers\Auth\PasswordResetController::class, 'reset'])->name('password.update');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->name('me');
    Route::post('/verify-2fa-login', [AuthController::class, 'verify2FALogin']);

    Route::group(['prefix' => 'admin'], function () {
        // Route::group(['prefix' => 'dashboard'], function () {
        //     Route::get('/admin-stats', [DashboardController::class, 'getAdminStats']);
        //     Route::get('/company-stats', [DashboardController::class, 'getCompanyStats']);
        // });
        Route::get('/all', [UserController::class, 'index']);
        Route::post('/register', [UserController::class, 'store']);
        Route::put('/update/{id}', [UserController::class, 'update']);
        Route::delete('/delete/{id}', [UserController::class, 'destroy']);
    });
});

// Routes requiring only authentication (auth:api)
Route::group(["middleware" => "auth:api"], function () {
    Route::post('/users/logout', [AuthController::class, 'logout']);
    Route::post('/users/update', [AuthController::class, 'update']);
    Route::put('/users/update_password', [AuthController::class, 'update_password']);
    Route::get('/users/admin', [AuthController::class, 'users']);
    // Direcciones del cliente
    Route::resource('ecommerce/address_client', AddressClientController::class);

    // Two-Factor Authentication Routes
    Route::post('/users/2fa/generate', [\App\Http\Controllers\Auth\TwoFactorController::class, 'generateSecret']);
    Route::post('/users/2fa/enable', [\App\Http\Controllers\Auth\TwoFactorController::class, 'enable']);
    Route::post('/users/2fa/disable', [\App\Http\Controllers\Auth\TwoFactorController::class, 'disable']);
});


// Company Tenant Routes - require auth + tenant middleware (suspended companies are blocked)
Route::group(['middleware' => ['auth:api', 'tenant']], function () {

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

    // Sales
    Route::post("sales/all", [SalesController::class, 'sale_all']);

}); // end tenant middleware group

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
        Route::get("payment-configs/{company_id}", [SaleController::class, 'payment_configs']);
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
    Route::post('companies/{id}/free-shipping', [CompanyController::class, 'toggleFreeShipping']);
    Route::post('products/{id}/status', [ModerationController::class, 'toggleProductStatus']);
    Route::post('system/reset-data', [\App\Http\Controllers\Admin\SystemController::class, 'resetDatabase']);
    Route::get('system/logs', [\App\Http\Controllers\Admin\SystemController::class, 'getLogs']);

    // Admin Billing Routes (Super Admin or Platform Admin)
    Route::get('billing/orders', [\App\Http\Controllers\Admin\BillingController::class, 'index']);
    Route::post('billing/orders/{id}/approve', [\App\Http\Controllers\Admin\BillingController::class, 'approve']);
    Route::post('billing/orders/{id}/reject', [\App\Http\Controllers\Admin\BillingController::class, 'reject']);
});

Route::group(['middleware' => ['auth:api', 'tenant'], 'prefix' => 'users/admin/dashboard'], function () {
    Route::get('/admin-stats', [DashboardController::class, 'getAdminStats']);
    Route::get('/company-stats', [DashboardController::class, 'getCompanyStats']);
});

// Company Admin Routes
Route::group(['middleware' => ['auth:api', 'tenant'], 'prefix' => 'company_admin'], function () {
    Route::resource('payment-config', \App\Http\Controllers\Admin\CompanyPaymentConfigController::class);
});

// ─── Notification Routes (no tenant middleware so suspended users can receive them) ───
Route::group(['middleware' => ['auth:api'], 'prefix' => 'notifications'], function () {
    Route::get('/', [\App\Http\Controllers\System\NotificationController::class, 'index']);
    Route::get('/unread-count', [\App\Http\Controllers\System\NotificationController::class, 'unreadCount']);
    Route::post('/read/{id}', [\App\Http\Controllers\System\NotificationController::class, 'markAsRead']);
    Route::post('/read-all', [\App\Http\Controllers\System\NotificationController::class, 'markAllAsRead']);
    Route::delete('/{id}', [\App\Http\Controllers\System\NotificationController::class, 'destroy']);
    // Admin: sending + history
    Route::post('/send', [\App\Http\Controllers\System\NotificationController::class, 'send']);
    Route::get('/targets', [\App\Http\Controllers\System\NotificationController::class, 'getTargets']);
    Route::get('/sent-history', [\App\Http\Controllers\System\NotificationController::class, 'sentHistory']);
});

Route::group(['middleware' => ['auth:api', 'tenant'], 'prefix' => 'tenant'], function () {
    Route::resource('live-events', LiveEventController::class);
    Route::get('questions', [QuestionController::class, 'index']);
    Route::post('questions/{id}/answer', [QuestionController::class, 'answer']);
});

// TEST ROUTE
Route::get('test-ai-knowledges', [\App\Http\Controllers\AIStudioController::class, 'getKnowledges']);

// NEW: Support and AI Studio Routes
Route::group(['middleware' => ['auth:api', 'tenant'], 'prefix' => 'support'], function () {
    Route::get('conversations', [\App\Http\Controllers\SupportController::class, 'getConversations']);
    Route::get('messages/{id}', [\App\Http\Controllers\SupportController::class, 'getMessages']);
    Route::post('send-message', [\App\Http\Controllers\SupportController::class, 'sendMessage']);
    Route::post('start-conversation', [\App\Http\Controllers\SupportController::class, 'startConversation']);
});

Route::group(['middleware' => ['auth:api', 'tenant'], 'prefix' => 'ai-studio'], function () {
    Route::get('knowledges', [\App\Http\Controllers\AIStudioController::class, 'getKnowledges']);
    Route::post('knowledge', [\App\Http\Controllers\AIStudioController::class, 'storeKnowledge']);
    Route::put('knowledge/{id}', [\App\Http\Controllers\AIStudioController::class, 'updateKnowledge']);
    Route::delete('knowledge/{id}', [\App\Http\Controllers\AIStudioController::class, 'deleteKnowledge']);
    Route::get('logs', [\App\Http\Controllers\AIStudioController::class, 'getLogs']);
    Route::post('ask', [\App\Http\Controllers\AIStudioController::class, 'askAI']);
});

// ─── Support Ticket System ─────────────────────────────────────────────────
// Company users (suspended companies can also open/view tickets, NO tenant middleware)
Route::group(['middleware' => ['auth:api'], 'prefix' => 'tickets'], function () {
    Route::get('/', [SupportTicketController::class, 'index']);
    Route::post('/', [SupportTicketController::class, 'store']);
    Route::get('/{id}', [SupportTicketController::class, 'show']);
    // Polling endpoint: returns only messages newer than ?after_id=X
    Route::get('/{id}/messages', [SupportTicketController::class, 'getMessages']);
    Route::post('/{id}/messages', [SupportTicketController::class, 'sendMessage']);
    Route::post('/{id}/survey', [SupportTicketController::class, 'submitSurvey']);
});

// Admin staff routes for ticket management (isStaff check is done inside controller)
Route::group(['middleware' => ['auth:api'], 'prefix' => 'admin/tickets'], function () {
    Route::get('/', [SupportTicketController::class, 'adminIndex']);
    Route::get('/analytics', [SupportTicketController::class, 'analytics']);
    Route::get('/{id}', [SupportTicketController::class, 'show']);
    Route::post('/{id}/messages', [SupportTicketController::class, 'sendMessage']);
    Route::post('/{id}/close', [SupportTicketController::class, 'close']);
    Route::post('/{id}/assign', [SupportTicketController::class, 'assign']);
    Route::get('/{id}/ai-analyze', [SupportTicketController::class, 'aiAnalyzeTicket']);
});