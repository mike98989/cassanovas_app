<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Flavours;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use File;


class FlavoursAuthController extends Controller
{
    public function create (Request $request) {
        $validator = Validator::make($request->all(), [
            'flavour' => 'required|string|max:255',
            'description' => 'required|string',
            'carton_price' => 'required|integer',
            'image_file'=>'required|image|mimes:jpg,png,jpeg|max:8192'
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        if(($request->file('image_file'))&&($request->file('image_file')!='')){   
            $file = $request->file('image_file');
            $CommonAuthController  = new CommonAuthController();
            $upload = $CommonAuthController->upload_file($file,$request,'public/flavour',10); 
            $request['image'] = $request->image_path;
            $save = Flavours::create($request->toArray());
            $response = ['message' => "New Flavour Created"];
        }else{
            $response = ['message' => "Please select an image file for flavour"];
        }
        
        // if($upload['status']=='1'){
        //     $publicNotice->save();
        //     $message="Page Updated";
        // }else{
        //     $message = $upload['message'];    
        // }
       
        return response($response, 200);
    }



    public function destroy(Request $request)
    {
        $flavour = Flavours::findOrFail($request->id);
        if ($flavour) {   
        //$delete_storage = File::delete(public_path('flavour/'.$flavour->image)); 
        $delete_storage = Storage::delete('flavour/'.$flavour->image); 
        $flavour->delete();
        $response = ["message" =>'Flavour Deleted'];
        return response($response, 200);
        }else{
            $response = ["message" =>'Invalid Flavour ID'];
            return response($response, 422);
        }
    }
}
