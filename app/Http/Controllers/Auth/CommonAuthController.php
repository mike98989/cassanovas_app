<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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

    public function calculate_file_size($file_size){
        return $file_size/1024/1024;
    }

    public function upload_file($file,$model,$storage_path,$max_file_size){
        $extension = strtolower($file->getClientOriginalExtension());
        $size = $this->calculate_file_size($file->getSize());
        //$max_file_size=5;
        $accepted_extension = ['jpeg','jpg','png','pdf','docx','xls'];
        if(in_array($extension,$accepted_extension)){
        $message = 'in array';
        if($size<=$max_file_size){
        $path = $file->store($storage_path);
        //$model->image_path=Storage::url($path);
        $model->image_path = $file->hashName();
        //$model->image_path = Storage::disk('public')->path($path);
        $message="File saved.";
        $status='1';
        }else{
        $message = 'File size exceeds '.$max_file_size.'mb'; 
        $status='0';   
        }
        }else{
        $message = 'Invalid File Format. Please select either of these extension'.json_encode($accepted_extension);
        $status='0';
        }
        $response = ["message" =>$message,'status'=>$status];
        return $response;
    }
}
