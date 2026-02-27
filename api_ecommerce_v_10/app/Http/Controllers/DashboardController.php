<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use App\Models\Sale\Sale;
use App\Models\Product\Product;
use App\Models\SupportConversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getAdminStats()
    {
        $activeCompanyScope = function ($q) {
            $q->where('status', 'active')->where('membership_expires_at', '>=', now());
        };

        $totalCompanies = Company::where('status', 'active')
            ->where('membership_expires_at', '>=', now())
            ->count();

        $totalUsers = User::where('state', 1)
            ->where(function ($q) use ($activeCompanyScope) {
                $q->whereNull('company_id')
                    ->orWhereHas('company', $activeCompanyScope);
            })->count();

        $totalSales = Sale::where('payment_status', 'PAID_APPROVED')
            ->whereHas('sale_details.product.company', $activeCompanyScope)
            ->sum('total');

        $totalMessages = SupportConversation::whereHas('userA', function ($q) use ($activeCompanyScope) {
            $q->where(function ($sq) use ($activeCompanyScope) {
                $sq->whereNull('company_id')->orWhereHas('company', $activeCompanyScope);
            });
        })->count();

        // Growth: Companies and Revenue per month (Last 6 months)
        $months = [];
        $companyCounts = [];
        $revenueCounts = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $months[] = $month->format('M');

            $companyCounts[] = Company::whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->count();

            $revenueCounts[] = Sale::whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->where('payment_status', 'PAID_APPROVED')
                ->sum('total');
        }

        $recentCompanies = Company::with('users')->latest()->take(5)->get();

        $topCompanies = Company::withCount('products')
            ->orderBy('products_count', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'total_companies' => $totalCompanies,
            'total_users' => $totalUsers,
            'total_sales' => round($totalSales, 2),
            'total_messages' => $totalMessages,
            'recent_companies' => $recentCompanies,
            'top_companies' => $topCompanies,
            'growth' => [
                'labels' => $months,
                'companies' => $companyCounts,
                'revenue' => array_map(function ($v) {
                    return round($v, 2);
                }, $revenueCounts)
            ]
        ]);
    }

    public function getCompanyStats(Request $request)
    {
        $user = auth('api')->user();
        if (!$user || !$user->company_id) {
            return response()->json(['error' => 'No company assigned'], 400);
        }

        $company_id = $user->company_id;

        $totalUsers = User::where('company_id', $company_id)->where('state', 1)->count();

        // Real Sales for this company
        $totalSales = DB::table('sale_details')
            ->join('products', 'sale_details.product_id', '=', 'products.id')
            ->join('sales', 'sale_details.sale_id', '=', 'sales.id')
            ->where('products.company_id', $company_id)
            ->where('sales.payment_status', 'PAID_APPROVED')
            ->sum('sale_details.total');

        $totalOrders = DB::table('sale_details')
            ->join('products', 'sale_details.product_id', '=', 'products.id')
            ->where('products.company_id', $company_id)
            ->distinct('sale_id')
            ->count('sale_id');

        $stockAlerts = Product::where('company_id', $company_id)
            ->where('stock', '<', 5)
            ->count();

        // Recent Orders
        $recentOrders = Sale::whereHas('sale_details.product', function ($q) use ($company_id) {
            $q->where('company_id', $company_id);
        })->with([
                    'user',
                    'sale_details' => function ($q) use ($company_id) {
                        $q->whereHas('product', function ($sq) use ($company_id) {
                            $sq->where('company_id', $company_id);
                        })->with('product');
                    }
                ])->latest()->take(5)->get();

        // Sales Trend (Last 7 days)
        $days = [];
        $daySales = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $days[] = $date->format('D');

            $daySales[] = DB::table('sale_details')
                ->join('products', 'sale_details.product_id', '=', 'products.id')
                ->join('sales', 'sale_details.sale_id', '=', 'sales.id')
                ->where('products.company_id', $company_id)
                ->whereDate('sales.created_at', $date)
                ->where('sales.payment_status', 'PAID_APPROVED')
                ->sum('sale_details.total');
        }

        // Top Selling Products
        $topProducts = Product::where('company_id', $company_id)
            ->withCount('sale_details')
            ->orderBy('sale_details_count', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'total_users' => $totalUsers,
            'total_sales' => round($totalSales, 2),
            'total_orders' => $totalOrders,
            'stock_alerts' => $stockAlerts,
            'recent_orders' => $recentOrders,
            'top_products' => $topProducts,
            'trend' => [
                'labels' => $days,
                'data' => array_map(function ($v) {
                    return round($v, 2);
                }, $daySales)
            ]
        ]);
    }
}
