<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function register(Request $request)
    { 
        $payload = [
            'password'=>bcrypt($request->password),
            'email'=>$request->email,
            'first_name'=>$request->first_name,
            'middle_name'=>$request->middle_name,
            'last_name'=>$request->last_name,
            'access_key'=>$request->access_key
        ];
               
        $user = new User($payload);
        if ($user->save()){
            $user = User::where('email', $request->email)->get()->first();
            $user->save();
            $response = [
                'success'=>true, 
                'data'=>[
                    'id'=>$user->id,
                    'first_name'=>$user->first_name,
                    'middle_name'=>$user->middle_name,
                    'last_name'=>$user->last_name,
                    'email'=>$request->email,
                    'access_key'=>$user->access_key
                ]
            ];        
        }
        else
            $response = ['success'=>false, 'data'=>'Couldnt register user'];
        
        return response()->json($response, 201);
    }

    private function authenticate(Request $request)
    {
        $user = User::where('email', $request->email)->get()->first();
        if ($user && \Hash::check($request->password, $user->password)){
            $user->save();
        }else{
            $user = null;
        }

        return $user;
    }

    public function login(Request $request)
    {
        $user = self::authenticate($request);
        if($user){
            $response = [
                'success'=>true, 
                'data'=>[
                    'id'=>$user->id,
                    'first_name'=>$user->first_name,
                    'last_name'=>$user->last_name,
                    'email'=>$user->email,
                    'email_verified_at'=>$user->email_verified_at,
                    'access_key'=>$user->access_key,
                ]
            ];           
        }
        else{
            $response = ['success'=>false, 'data'=>'Incorrect email or password.'];
        } 
        return response()->json($response, 201);
    }
}
