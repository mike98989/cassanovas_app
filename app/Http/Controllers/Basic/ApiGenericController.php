<?php

namespace App\Http\Controllers\Basic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Auth\OrdersAuthController;

class ApiGenericController extends Controller
{
    ///// GET ALL STATES
    public function get_all_states (Request $request) {
    $states = DB::table('states')->get();
    $response = ['response'=>$states,'status'=> '1'];
    return response($response, 200);
    }

    ///////////VERIFY PAYSTACK PAYMENT
    public function verify_paystack_payment(Request $request){
      $curl = curl_init();
      curl_setopt_array($curl, array(
      CURLOPT_URL => "https://api.paystack.co/transaction/verify/".$request->reference,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer ".env('PAYSTACK_SECRETE_KEY'),
        "Cache-Control: no-cache",

      ),
    ));
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err) {
      $response = ["message" => "cURL Error #:" . $err];
      return response($response, 422);
    } else {
      $result = json_decode($response, true);
      OrdersAuthController::update_transaction_status($result['data']['metadata']['order_id'],$result['data']['reference'],$result['data']['metadata']['flavour_id'],$result['data']['customer']['email'],$response);
      return response($result, 200);
    }
  }



    ///// GET ALL FLAVOURS
    public function get_all_flavours () {
    $flavours = DB::table('flavours')->get();
    $response = ['response'=>$flavours,'status'=> '1'];
    return response()->json($response, 200);
    }
}
