<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('request_id');
            $table->string('request_type_id')->nullable($value = true);

            //for manager details
            $table->integer('analyst');
            $table->dateTime('date_time_release');
            $table->string('bg_task');  
            $table->string('ai_synopsis');
            $table->string('ai_number');
            $table->string('bg_customer_name');
            $table->string('bg_project_name');
            $table->string('task')->nullable($value = true);
            $table->integer('owner')->nullable($value = true);
            $table->integer('hours')->nullable($value = true);
            $table->dateTime('high_level_end_date')->nullable($value = true);
            $table->dateTime('start_date')->nullable($value = true);
            $table->dateTime('end_date')->nullable($value = true);
            $table->integer('days_req')->nullable($value = true);
            $table->string('status')->nullable($value = true);
            $table->longText('comment')->nullable($value = true);
            $table->string('month')->nullable($value = true);

            //for dev details
            $table->string('specification_name');
            $table->string('fmt_path');
            $table->string('cloned_from');
            $table->string('library_solution_id');
            $table->string('lookup_table');
            $table->string('release_note');
            $table->string('attachment');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_details');
    }
}
