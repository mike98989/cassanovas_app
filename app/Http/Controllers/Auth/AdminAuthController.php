<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\UserAuthController;

class AdminAuthController extends Controller
{
    public function user(Request $request){
        return response($request->user(), 200);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:admin',
            'phone' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/',
            
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $request['rand'] = rand(100000,1000000);
        //////// Hash password
        $request['password']=Hash::make($request['password']);
        $distributor = Admin::create($request->toArray());
        $token = $distributor->createToken('Cassanovas_Sales_App')->accessToken;
        
        //$send_mail = $this->send_mail($request->company_email,$request->company_name,"Welcome On Board",$emailHtmlMessage);
        //$response = ['message' => $send_mail,'status'=>'1'];
        $response = ['message' => "New Admin Created",'status'=>'1'];
        return response($response, 200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|max:255',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $matchThese = ['admin.email' => $request->email];
        $user = Admin::where($matchThese)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                //$token = $user->createToken('Laravel Password Grant Client')->accessToken;
                /////////UPDATE LAST LOGIN
                date_default_timezone_set('Africa/Lagos');
                $user->last_login = date('Y-m-d H:i:s');  
                $user->save();

                $request->grant_type='password';
                $request->company_email=$request->email;
                $token = UserAuthController::get_refresh_access_token($request);
                //$token=$this->get_refresh_access_token($request);
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


    //////////// LOGOUT
    public function logout (Request $request) {
    $token = $request->user()->token();
    $token->revoke();
    $response = ['message' => 'You have been successfully logged out!'];
    return response($response, 200);
    }



    ////////// FUNCTIO GET ALL ADMINS
    function get_all_admins(Request $request){
        return Admin::all();
    }
}
