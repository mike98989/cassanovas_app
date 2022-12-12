<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('rand');
            $table->string('user_email');
            $table->string('flavour_id');
            $table->string('price');
            $table->string('qty');
            $table->string('status')->default('1');
            $table->string('transaction_status')->nullable();
            $table->string('transaction_reference')->nullable();
            $table->text('transaction_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
