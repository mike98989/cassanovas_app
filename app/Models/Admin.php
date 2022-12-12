<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;  //add the namespace

class Admin extends Model
{
   
    use HasApiTokens, HasFactory, Notifiable;
    protected $table="admin";
    
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'password',
        'rand',
        
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    public function findForPassport($username)
    {
        return $this->where('email', $username)->first();
    }

}
