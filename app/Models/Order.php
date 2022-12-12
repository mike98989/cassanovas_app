<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'flavour_id',
        'user_email',
        'qty',
        'price',
        'rand',
    ];

    public function flavour()
    {
        return $this->hasOne(Flavours::class,'id');
    }
}
