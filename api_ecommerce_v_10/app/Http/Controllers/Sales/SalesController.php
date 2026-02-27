<?php

namespace App\Http\Controllers\Sales;

use App\Models\Sale\Sale;
use Illuminate\Http\Request;
use App\Models\Product\Categorie;
use App\Http\Controllers\Controller;
use App\Http\Resources\Ecommerce\Sale\SaleOCollection;

class SalesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function sale_all(Request $request)
    {
        $search = $request->search;
        $categorie_id = $request->categorie_id;
        $start_date = $request->start_date;
        $end_date = $request->end_date;

        $user = auth('api')->user();

        $query = Sale::filterAdvance($search, $categorie_id, $start_date, $end_date)->orderBy("id", "desc");

        // Si el usuario no tiene permiso global, solo ve ventas de su compañía
        if (!$user->hasPermission('view_global_sales') && $user->company_id) {
            $query->whereHas("sale_details.product", function ($q) use ($user) {
                $q->where("company_id", $user->company_id);
            });
        }

        $orders = $query->get();
        $categories = Categorie::orderBy("id", "desc")->get();
        return response()->json(["categories" => $categories, "orders" => SaleOCollection::make($orders)]);
    }
}
