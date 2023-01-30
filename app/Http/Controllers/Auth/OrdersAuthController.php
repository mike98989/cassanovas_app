<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\Flavours;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class OrdersAuthController extends Controller
{
    public function create (Request $request) {

        $validator = Validator::make($request->all(), [
            'price' => 'required|string',
            'flavours' => 'required|string',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $flavours = json_decode($request->flavours);
        // $response = ['response' => $flavours];
        // return response($response, 200);
        $request['user_email'] = $request->user()->company_email;
        $request['order_rand']=rand(10000,1000000);
        foreach($flavours as $flavour){  
        //$matchThese = ['user_email' => $request->user_email,'qty'=>$flavour->selected_quantity,'flavour_id' => $flavour->id,'status'=>'1'];
        $request['flavour_id'] = $flavour->id;
        $request['qty'] = $flavour->selected_quantity;
        $request['sales_price'] = $flavour->carton_price;
        //$user = OrderDetails::where($matchThese)->first();
        //if (!$user) {
        $order = OrderDetails::create($request->toArray()); 
        $message = "New order Created!";
        //}
        // else{
        // $rand = $user['order_rand'];    
        // $message = "Order already exist!";    
        // }
        }

        $matchOrderData = ['user_email' => $request->user_email,'rand'=>$request['order_rand'],'price' => $request->price,'status'=>'1'];
        $request['rand'] = $request['order_rand'];
        $order = Order::where($matchOrderData)->first();
        if (!$order) {
            $order = Order::create($request->toArray());
            $message = "New order Created!";
        }

        $response = ['response' => $message,'status'=> '1','order_id'=>$request['order_rand']];
        return response($response, 200);
    }

    function update_transaction_status($rand,$trans_ref,$email,$response_text){
        $order = Order::where('rand', '=', $rand)->where('user_email', '=', $email)->where('transaction_status', '=', null)->first();
        if($order){
        $toEmailArray=array(['name' => 'Admin', 'email' => 'hayesconsultsltd@gmail.com'],['name' => 'Precious', 'email' => 'mike98989@gmail.com']);
        $order_details = DB::table('order_details')->join('flavours','flavours.id','=','order_details.flavour_id')->where('order_details.order_rand','=',$rand)->where('order_details.status','=','1')->get();
        $order_statement='New Order Request - Ref: '.$trans_ref.'<br/>';
        foreach($order_details as $details){  
            $order_statement .= '<li>'.$details->qty.' '.$details->flavour.' @ '.$details->sales_price.'</li>';
        }
        $order_statement .= '<li><b>Total = '.$order->price.'</b></li>';
        //return $order_statement;
        $emailHtmlMessage = "<div><h5> Order from ".$order->user_email.",</h5>".$order_statement;
        $send_mail = (new UserAuthController)->send_mail($toEmailArray,"Order Request - ".$trans_ref,$emailHtmlMessage);

        $order->transaction_status = '1';
        $order->transaction_reference = $trans_ref;
        $order->transaction_data = $response_text;
        $order->save();
        }
    }


    ///////GET ALL PENDING OR COMPLETED ORDERS
    public function get_pending_or_completed_orders (Request $request){
        $orders= Order::where('transaction_status','=',$request->status)->where('user_email','=',$request->user()->company_email)->orderBy('created_at', 'desc')->get();
        foreach($orders as $order){
        $order_details = OrderDetails::where('order_details.order_rand','=',$order->rand)->join('flavours','flavours.id','=','order_details.flavour_id')->get();
        $order->order_details = $order_details;
        }
        
        return $orders;
        //return pages::all();
    }

    ///////GET ALL USER ORDERS  
    public function get_user_orders (Request $request){
        $user_email = $request->user()->company_email;
        $result = DB::select(DB::raw("SELECT (SELECT COUNT(*) FROM orders WHERE orders.status='1' AND user_email='".$user_email."' AND transaction_status='1') completed, (SELECT COUNT(*) FROM orders WHERE orders.status='1' AND user_email='".$user_email."' AND transaction_status IS NULL) cancelled"));
        $response = ['message'=>$result,'status'=> '1'];
        return response($response, 200);
    }


    ///////GET ALL TRANSACTIONS
    public function get_all_transactions (Request $request){
        $orders= Order::orderBy('created_at', 'desc')->get();
        foreach($orders as $order){
            $order_details = OrderDetails::where('order_details.order_rand','=',$order->rand)->join('flavours','flavours.id','=','order_details.flavour_id')->get();
            $order->order_details = $order_details;
        }
        
        return $orders;
    }

}
