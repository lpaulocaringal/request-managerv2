<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestsType extends Model
{
    protected $table = 'request_type';
    public $timestamps = false;

    protected $fillable = [
        'request_id',
        'resources_id',
        'phase',
        'request_type',
        'product',
        'complexity',
        'task'
    ];
}
