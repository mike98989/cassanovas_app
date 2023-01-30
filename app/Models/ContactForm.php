<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactForm extends Model
{
    use HasFactory;
    protected $table = 'contact_form';
    protected $fillable = [
        'full_name',
        'email_address',
        'phone_number',
        'subject',
        'message',
    ];
}
