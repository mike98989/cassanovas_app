<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('distributors', function (Blueprint $table) {
            $table->id();
            $table->string('rand');
            $table->string('company_name');
            $table->string('company_phone');
            $table->string('company_email')->unique();
            $table->string('company_address');
            $table->string('state');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('activation_url')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->timestamp('last_login')->nullable();
            $table->integer('status')->default('1');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('distributors');
    }
}
