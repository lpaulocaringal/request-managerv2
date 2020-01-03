<?php

namespace App\Http\Controllers;
use Carbon\Carbon;

use App\User;
use App\Requests;
use App\RequestsType;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    public function addRequest(Request $request){
        if(!Requests::where('request_id', $request->request_id)->first()){
            $requests = new Requests;
            $requests->request_id = $request->request_id;
            $requests->analyst = $request->analyst_user_id;

            $mytime = Carbon::now();
            $requests->date_time_release = $mytime->toDateTimeString();

            $requests->bg_task = $request->bg_task;
            $requests->ai_synopsis = $request->ai_synopsis;
            $requests->ai_number = $request->ai_number;
            $requests->bg_customer_name = $request->bg_customer_name;
            $requests->bg_project_name = $request->bg_project_name;
            $requests->specification_name = $request->specification_name;
            $requests->fmt_path = $request->fmt_path;
            $requests->cloned_from = $request->cloned_from;
            $requests->library_solution_id = $request->library_solution_id;
            $requests->lookup_table = $request->lookup_table;
            $requests->release_note = $request->release_note;
            $requests->attachment = $request->attachment;
            $requests->status = "ongoing";

            $requests->save();

            $requests_type = new RequestsType;
            $requests_type->request_id = $request->bg_task;
            for($i=0;$i<count($request->request_type['request']);$i++){
                $requests_type->request_type = $request->request_type['request'][$i];
                $requests_type->product = $request->request_type['product'][$i];
                $requests_type->complexity = $request->request_type['complexity'][$i];
                $requests_type->task = $request->request_type['task'][$i];
                $requests_type->save();
            }

            $response = [
                'success'=>true, 
                'data'=>$requests::where('id',$requests->id)    
                    ->get()
            ];
        }
        else{
            $response = [
                'success'=>false,
                'data' => "New Request have identical ID" 
            ];
        }

        return response()->json($response, 201);
    }

    public function getRequestSummary(Request $request){
        $size = $request->size;
        $requests = Requests::select('request_id','date_time_release','status')->orderBy('date_time_release')->paginate($size);
        return response()->json($requests, 201);
    }

    public function getRequestDetails(Request $request){
        $requests = Requests::where('request_id',$request->request_id)->first();
        $requests_type = RequestsType::where('request_id',$request->request_id)->get();
        $analyst = User::select('first_name','last_name')->where('id',$requests->analyst)->first();
        $response = [
            'success' => true,
            'data' => $requests,
            'analyst' => $analyst,
            'request_type' => $requests_type
        ];
        return response()->json($response, 201);
    }
}
