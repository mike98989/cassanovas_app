<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Flavours;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class OrdersAuthController extends Controller
{
    public function create (Request $request) {
        $validator = Validator::make($request->all(), [
            'price' => 'required|integer',
            'qty' => 'required|integer',
            'flavour_id' => 'required|integer',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $request['user_email'] = $request->user()->company_email;
        $matchThese = ['user_email' => $request->user_email,'qty'=>$request->qty,'price'=>$request->price,'flavour_id' => $request->flavour_id,'status'=>'1','transaction_status'=>null];
        $user = Order::where($matchThese)->first();
        if (!$user) {
        $request['rand']=rand(10000,1000000);
        $order = Order::create($request->toArray());
        $rand = $request['rand']; 
        $message = "New order Created!";
        }else{
        $rand = $user['rand'];    
        $message = "Order already exist!";    
        }
        $response = ['response' => $message,'status'=> '1','order_id'=>$rand];
        return response($response, 200);
    }

    function update_transaction_status($rand,$trans_ref,$flavour_id,$email,$response_text){
        $order = Order::where('rand', '=', $rand)->where('user_email', '=', $email)->where('transaction_status', '=', null)->first();
        if($order){
        $order->transaction_status = '1';
        $order->transaction_reference = $trans_ref;
        $order->transaction_data = $response_text;
        $order->save();
        }
    }


    ///////GET ALL PENDING OR COMPLETED ORDERS
    public function get_pending_or_completed_orders (Request $request){
        $orders= Order::where('status','=',$request->status)->where('user_email','=',$request->user()->company_email)->orderBy('created_at', 'desc')->get();
        foreach($orders as $order){
        $flavour = Flavours::where('id','=',$order->flavour_id)->get();
        $order->flavour = $flavour[0] ;
        }
        
        return $orders;
        //return pages::all();
    }

    ///////GET ALL USER ORDERS  
    public function get_user_orders (Request $request){
        $user_email = $request->user()->company_email;
        $result = DB::select(DB::raw("SELECT (SELECT COUNT(*) FROM orders WHERE orders.status='1' AND user_email='".$user_email."') pending, (SELECT COUNT(*) FROM orders WHERE orders.status='2' AND user_email='".$user_email."') completed, (SELECT COUNT(*) FROM orders WHERE orders.status='0' AND user_email='".$user_email."') cancelled"));
        $response = ['message'=>$result,'status'=> '1'];
        return response($response, 200);
    }


    ///////GET ALL TRANSACTIONS
    public function get_all_transactions (Request $request){
        $orders= Order::orderBy('created_at', 'desc')->get();
        foreach($orders as $order){
        $flavour = Flavours::where('id','=',$order->flavour_id)->get();
        $order->flavour = $flavour[0] ;
        }
        
        return $orders;
    }

}
