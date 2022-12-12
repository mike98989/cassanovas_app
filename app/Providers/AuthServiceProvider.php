<?php

namespace App\Providers;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
         'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
        // Passport::tokensExpireIn(Carbon::now()->addDays(1));
        Passport::tokensExpireIn(Carbon::now()->addHours(2));
        //Passport:: refreshTokensExpireIn(Carbon::now()->addDays(10));
        Passport:: refreshTokensExpireIn(Carbon::now()->addDays(3));
        Passport::personalAccessTokensExpireIn(now()->addMonths(6));
        //
    }
}
