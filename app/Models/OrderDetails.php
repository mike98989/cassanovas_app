<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    use HasFactory;
    protected $table="order_details";
    protected $fillable = [
        'flavour_id',
        'user_email',
        'qty',
        'sales_price',
        'order_rand',
    ];
    public function flavour()
    {
        return $this->hasOne(Flavours::class,'id');
    }
}
