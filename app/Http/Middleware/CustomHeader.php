<?php

namespace App\Http\Middleware;

use Closure;

class CustomHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->hasHeader('cassanovas-authorize')) {
            $header = $request->header('cassanovas-authorize');
            if ($header=='cassanovas.api') {
            return $next($request);
            }else{
            $message = ["message" => "Unauthorized Header"];
            return response($message, 401);
            }
        } else {
            $message = ["message" => "Unauthorized Header"];
            return response($message, 401);
        }

    }

    
}
