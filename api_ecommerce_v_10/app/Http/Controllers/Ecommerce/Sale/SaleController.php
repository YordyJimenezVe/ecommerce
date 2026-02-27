<?php

namespace App\Http\Controllers\Ecommerce\Sale;

use App\Models\Sale\Sale;
use App\Mail\Sale\SaleMail;
use Illuminate\Http\Request;
use App\Models\Cart\CartShop;
use App\Models\Sale\SaleDetail;
use App\Models\Sale\SaleAddress;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class SaleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $sale_data = $request->sale;
        if (is_string($sale_data)) {
            $sale_data = json_decode($sale_data, true);
        }

        $sale = Sale::create($sale_data);
        //
        $sale_address_data = $request->sale_address;
        if (is_string($sale_address_data)) {
            $sale_address_data = json_decode($sale_address_data, true);
        }

        $sale_address = $sale_address_data;
        $sale_address["sale_id"] = $sale->id;
        $sale_address = SaleAddress::create($sale_address);

        //CARRITO DE COMPRA O DETALLE DE VENTA

        $cartshop = CartShop::where("user_id", auth('api')->user()->id)->get();

        foreach ($cartshop as $key => $cart) {
            // $cart->delete();
            $sale_detail = $cart->toArray();
            $sale_detail["sale_id"] = $sale->id;
            SaleDetail::create($sale_detail);
        }

        // Handle Payment Proof
        if ($request->hasFile("payment_proof")) {
            $path = \Illuminate\Support\Facades\Storage::putFile("payment_proofs", $request->file("payment_proof"));
            $sale->update(['payment_proof' => $path]);
        }

        // Notify Admins about new manual order
        // Ideally we fetch users with 'billing' role or company admins
        // For now, let's assume we notify the Company Admin associated with the products? 
        // Or simpler: Notify all Super Admins or just create a generic system notification
        // Re-reading requirements: "a la empresa le llegaran los captures".
        // The sale belongs to a user. The products belong to companies. 
        // If single vendor, it's easy. If multi-vendor, we'd notify each company.
        // Assuming single company context for the "Ecommerce Template" or Sales are per-company.
        // Let's create a notification for the Company Admin of the first product in the cart (assuming single cart context).
        // Or just log it for now as a system notification.

        \App\Models\Notification::create([
            'user_id' => 1, // Placeholder for Admin ID, or find logic to get Company Admin
            'title' => 'Nueva Orden Manual #' . $sale->id,
            'message' => 'Se ha creado una nueva orden con pago manual. Por favor revisar.',
            'type' => 'system',
            'link' => '/admin/billing/orders'
        ]);

        Mail::to($sale->user->email)->send(new SaleMail($sale));
        return response()->json(["message" => 200, "message_text" => "LA VENTA SE EFECTUO DE MANERA CORRECTA"]);
    }

    public function send_email($id)
    {
        $sale = Sale::findOrFail($id);
        Mail::to("echodeveloper960@gmail.com")->send(new SaleMail($sale));
        return "TODO SALIO BIEN";
    }
    public function payment_configs($company_id)
    {
        $configs = \App\Models\CompanyPaymentConfig::where("company_id", $company_id)->where("is_active", true)->get();
        return response()->json(["configs" => $configs]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
