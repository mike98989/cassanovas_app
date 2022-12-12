<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    use HasFactory;

    protected $table="tickets";

    protected $fillable = [
        'ticket_id',
        'user_email',
        'subject',
        'message',
    ];
}
