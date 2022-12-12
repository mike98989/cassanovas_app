<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommonAuthController extends Controller
{
    public function disable_enable(Request $request){
        if($request->whereColumn){$where=$request->whereColumn;}else{$where='id';}    
        if($request->column){
        $query = DB::table($request->table)->where($where, $request->id)->update([$request->column => $request->action]);
        }else{
        $query = DB::table($request->table)->where($where, $request->id)->update(['status' => $request->action]);
        }
        if ($query) {
            $response = ["message" => $request->table." Updated"];
            return response($response, 200);
        }else{
            $response = ["message" => "Something went wrong. Please try again.".$request->table." ".$request->action." ".$request->id];
            return response($response, 422);
        }
    
        }
}
