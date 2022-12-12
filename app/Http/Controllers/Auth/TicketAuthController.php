<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SupportTicket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class TicketAuthController extends Controller
{
    public function create (Request $request) {
        $validator = Validator::make($request->all(), [
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        
        $request['user_email'] = $request->user()->company_email;
        $request['ticket_id']=rand(10000,1000000);
        $order = SupportTicket::create($request->toArray());
        $rand = $request['rand']; 
        $message = "New ticket Created!";
        $response = ['message' => $message,'status'=> '1'];
        return response($response, 200);
    }


    ///////GET ALL PENDING OR COMPLETED ORDERS
    public function get_user_tickets (Request $request){
        $tickets= SupportTicket::where('user_email','=',$request->user()->company_email)
        // join('ticket_response')
        ->orderBy('created_at', 'desc')->get();
        
        return $tickets;
        //return pages::all();
    }
}
