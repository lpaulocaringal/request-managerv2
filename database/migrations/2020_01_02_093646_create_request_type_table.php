<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_type', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('request_id');
            $table->string('resource_id')->nullable($value = true);
            $table->string('phase')->nullable($value = true);
            $table->string('request_type');
            $table->string('product');
            $table->string('complexity');
            $table->string('task');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_type');
    }
}
