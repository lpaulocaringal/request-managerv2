<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Requests extends Model
{
    protected $table = 'request_details';
    public $timestamps = false;

    protected $fillable = [
        'request_id', 
        'analyst', 
        'date_time_release', 
        'bg_task', 
        'ai_synopsis', 
        'ai_number',
        'bg_customer_name', 
        'bg_project_name', 
        'task', 
        'owner', 
        'hours', 
        'high_level_end_date',
        'start_date', 
        'end_date', 
        'days_req', 
        'status', 
        'comment', 
        'month',
        'specification_name', 
        'fmt_path', 
        'cloned_from', 
        'library_solution_id', 
        'lookup_table', 
        'release_note',
        'attachment'
    ];
}
