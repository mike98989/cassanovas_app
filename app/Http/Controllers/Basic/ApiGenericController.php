<?php

namespace App\Http\Controllers\Basic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Auth\OrdersAuthController;
use App\Http\Controllers\Auth\UserAuthController;
use GuzzleHttp\Client as GuzzleClient; 
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Validator;
use App\Models\ContactForm;

   //use GuzzleHttp\Message\Request;
    //use GuzzleHttp\Message\Response;


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
      $key = env('ENV')=='public'? env('PAYSTACK_SECRETE_KEY_LIVE'):env('PAYSTACK_SECRETE_KEY');
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
        "Authorization: Bearer ".$key,
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
      (new OrdersAuthController)->update_transaction_status($result['data']['metadata']['order_id'],$result['data']['reference'],$result['data']['customer']['email'],$response);
      return response($result, 200);
    }
  }



    ///// GET ALL FLAVOURS
    public function get_all_flavours () {
    $flavours = DB::table('flavours')->get();
    $response = ['response'=>$flavours,'status'=> '1'];
    return response()->json($response, 200);
    // $headers = ['cassanovas_authorize' => 'application/json'];
    // $client = new \GuzzleHttp\Client(['headers' => ['cassanovas_authorize' => 'cassanovas.api']]);
    // $r = $client->request('GET', 'https://cassanovas.ng/api/v1/get_all_states');
    // $response = $r->getBody()->getContents();

    // return response()->json($response, 200);
    }

    //////// SEND CONTACT US MESSAGE
    public function send_contact_message(Request $request){
      $validator = Validator::make($request->all(), [
        'full_name' => 'required|string|max:255',
        'email_address' => 'required|email',
        'phone_number' => 'required|string|max:15',
        'subject'=>'required|string',
        'message'=>'required|string'
        
    ]);
    if ($validator->fails())
    {
        return response(['errors'=>$validator->errors()->all()], 422);
    }
    
    $emailHtmlMessage = "<div style='font-size:15px'><h4> Message From ".$request->full_name.",</h4>
    Email address: ".$request->email_address."<br/>
    Phone number: ".$request->phone_number."<br/>
    <h5>".$request->subject."</h5>
    <p style='line-height:25px'>".$request->message."</div>";
    $UserAuthController  = new UserAuthController();
    //$upload = $CommonAuthController->upload_file($file,$request,'public/flavour',10); 
    $toEmailArray=array(['name' => $request->full_name, 'email' => 'hayesconsultsltd@gmail.com']);
    $send_mail = $UserAuthController->send_mail($toEmailArray,"Cassanovas - ".$request->email_address,$emailHtmlMessage);

    //$send = ContactForm::create($request->toArray());
    $response = ['message' => 'Your message was successful. We will get in touch shortly','status'=>'1'];
    return response($response, 200);
    }
}
