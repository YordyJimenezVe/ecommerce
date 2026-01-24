<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SystemController extends Controller
{
    public function resetDatabase()
    {
        try {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::table('products')->truncate();
            DB::table('product_images')->truncate();
            DB::table('product_sizes')->truncate();
            DB::table('product_size_colors')->truncate();
            DB::table('cart_shops')->truncate();
            DB::table('sales')->truncate();
            DB::table('sale_details')->truncate();
            DB::table('reviews')->truncate();
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');

            return response()->json([
                'message' => 'Database successfully cleared (Products & Transactions)',
                'status' => 200
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error clearing database: ' . $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
}
