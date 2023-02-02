<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
//use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\HasApiTokens;  //add the namespace
use Illuminate\Support\Facades\DB;

class Distributor extends Authenticatable
{
    protected $table="distributors";
    //protected $primaryKey = 'company_email';
    
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'company_name',
        'company_email',
        'company_phone',
        'company_address',
        'password',
        'state',
        'activation_url',
        'rand',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function findForPassport($username)
    {
        $check =$this->where('company_email', $username)->first();
        // if($check==null){
        //     $check =  $this->hasOne(\App\Models\Admin::class, 'email', $username);
        //     //$check = Admin::where('email',$username)->first();
        // }
        return $check;
    }
}
