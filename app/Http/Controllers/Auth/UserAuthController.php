<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Distributor;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Mailgun\Mailgun;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
class UserAuthController extends Controller
{
    
    public function user(Request $request){
        return response($request->user(), 200);
    }
    
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string|max:255',
            'company_email' => 'required|email|unique:distributors',
            'company_phone' => 'required|string|max:255',
            'state'=>'required|string',
            
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        
        $request['activation_url'] = strtolower(Str::random(30));
        $request['rand'] = rand(100000,1000000);
        $distributor = Distributor::create($request->toArray());
        $token = $distributor->createToken('Cassanovas_Sales_App')->accessToken;
        $emailHtmlMessage = 'It is so simple to send a message.';
        $send_mail = $this->send_mail($request->company_email,$request->company_name,"Welcome On Board",$emailHtmlMessage);
        //$response = ['message' => $send_mail,'status'=>'1'];
        $response = ['message' => "New User Created",'status'=>'1'];
        return response($response, 200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company_email' => 'required|string|max:255',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $matchThese = ['distributors.company_email' => $request->company_email];
        $user = Distributor::where($matchThese)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                //$token = $user->createToken('Laravel Password Grant Client')->accessToken;
                /////////UPDATE LAST LOGIN
                date_default_timezone_set('Africa/Lagos');
                $user->last_login = date('Y-m-d H:i:s');  
                $user->save();

                // $token = $user->createToken("Cassanovas_token");
                // $user->token = $token->plainTextToken;
                // $user->token_expire_at = $token->accessToken->expired_at;
                $request->grant_type='password';
                $token=$this->get_refresh_access_token($request);
                $response['token'] = $token;
                $response['data']=$user;
                $response['success']=true;
                return response($response, 200);
            } else {
                $response = ["message" => "Password mismatched"];
                return response($response, 422);
            }
        } else {
            $response = ["message" =>'Invalid Username and Password combination'];
            return response($response, 422);
        }

    }


    public function get_refresh_access_token(Request $request){
        $base_url=env('APP_URL').":8000";
        $client_secrete2=env('PASSPORT_CLIENT_SECRET2');
        $client_id2=env('PASSPORT_CLIENT_ID2');
        //return getAuthIdentifierName();
       
        if($request->grant_type=='password'){
             //return $request->company_email?$request->company_email:$request->email;
            $request->request->add([
                "grant_type" => "password",
                "username" => $request->company_email?$request->company_email:$request->email,
                "password" => $request->password,
                "client_id"     => $client_id2,
                "client_secret" => $client_secrete2,
            ]);
            $tokenRequest = $request->create($base_url.'/oauth/token','post');
            $instance = Route::dispatch($tokenRequest);
            //return response($instance->getContent(), 200);
            return json_decode($instance->getContent());
        }else{
            $request->request->add([
                "grant_type" => $request->grant_type,
                "refresh_token" => $request->refresh_token,
                "client_id"     => $client_id2,
                "client_secret" => $client_secrete2,
            ]);
            $tokenRequest = $request->create($base_url.'/oauth/token','post');
            $instance = Route::dispatch($tokenRequest);
            //return response($instance->getContent(), 200);
            return json_decode($instance->getContent());
                

        }
        
        
    }

    public function send_mail($toEmail,$name,$subject,$message){
        require '../vendor/autoload.php';
        # Instantiate the client.
        // First, instantiate the SDK with your API credentials
        $mg = Mailgun::create('7f24132da502722cc0d555f63cb75a87-8845d1b1-5933962f'); // For US servers
        
        //$mg = Mailgun::create('7f24132da502722cc0d555f63cb75a87-8845d1b1-5933962f', 'https://api.eu.mailgun.net'); // For EU servers

        // Now, compose and send your message.
        // $mg->messages()->send($domain, $params);
        $result = $mg->messages()->send('sandbox24401b5b86244884a97e168bc46e08b1.mailgun.org', [
        'from'    => 'noreply@hayesconsultsltd.com',
        'to'      => $toEmail,
        'subject' => $subject,
        'text'    => $message
        ]);

//         require '../vendor/autoload.php';
        
// # Instantiate the client.
// $mgClient = new Mailgun('7f24132da502722cc0d555f63cb75a87-8845d1b1-5933962f');
// $domain = "https://api.mailgun.net/v3/sandbox24401b5b86244884a97e168bc46e08b1.mailgun.org";
// # Make the call to the client.
// $result = $mgClient->sendMessage($domain, array(
// 	'from'	=> 'noreply@hayesconsultsltd.com',
// 	'to'	=> $toEmail,
// 	'subject' => $subject,
// 	'text'	=> $message
// ));

        return $result;

    }


    /////////// CONFIRM ACTIVATION ID
    public function confirm_activation_id(Request $request){
    $validator = Validator::make($request->all(), [
        'id' => 'required|string|max:255',
    ]);
    if ($validator->fails())
    {
        return response(['errors'=>$validator->errors()->all()], 422);
    }
    $fetch = DB::table('distributors')->where('activation_url',$request->id)->where('email_verified_at',null)->get();
    $count_data = count($fetch);

    $count_data>0 ? $msg="Found result" : $msg="No result found";
    $response = ["message" =>$msg,'status'=>$count_data,'details'=>$fetch];

    return response($response, 200);
  }

    ///////////UPDATE PASSWORD AND STATUS
    public function update_password_status(Request $request){
    $validator = Validator::make($request->all(), [
        '_rand' => 'required|string|max:255',
        'password' => 'required|string|min:8|confirmed|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/',
    ]);
    if ($validator->fails())
    {
        return response(['errors'=>$validator->errors()->all()], 422);
    }
    //////// Hash password
    $request['password']=Hash::make($request['password']);
    $update = DB::table('distributors')->where('rand', $request->_rand)->where('email_verified_at', null)
        ->update(['password'=>$request->password,'status'=>'1','email_verified_at'=>date('Y-m-d H:i:s')]);
    $update=='1'? $msg="Your account data is updated successfully! Please proceed to login":$msg="Record not found";
    $response = ['message' => $msg,"status"=>$update];
    return response($response, 200);
  
  }

  //////////// LOGOUT
  public function logout (Request $request) {
    $token = $request->user()->token();
    $token->revoke();
    $response = ['message' => 'You have been successfully logged out!'];
    return response($response, 200);
}

////////GET ALL DISTRIBUTORS
public function get_all_distributors(){
    return Distributor::all();
}


////////GET  DISTRIBUTORS DETAILS WITH PAYMENT DETAILS
public function get_distributor_details(Request $request){
    $get = Distributor::where('rand','=',$request->rand)->first();
    //$transactions = DB::('orders')->where('user_email','=',$get->company_email)->get();
    $get->transactions = DB::table('orders')->where('user_email','=',$get->company_email)->get();
    $get->support_tickets = DB::table('tickets')->where('user_email','=',$get->company_email)->get();
    //$transactions = $this->hasMany(Order::class, 'user_email','company_email');
    return $get;
    //return Distributor::all();
}

}
