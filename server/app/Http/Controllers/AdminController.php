<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
   
    public function login(Request $request){
        $admin = Admin::where('email', '=', $request->email)->first();
        if($admin){
            if($request->password == $admin->password){
                $token = bin2hex(random_bytes(32)); // Generate a random token
                session(['token_admin' => $token]); // Store token in session
    
                return response()->json([
                    'message' => 'Login Success',
                    'status' => 'success',
                    'token' => $token // Optionally return the token in response
                ], 200);
            }
        }
        return response()->json([
            'message' => 'The Provided Credentials are incorrect',
            'status' => 'failed'
        ], 401);
    }
    
    // public function login(Request $request){
    //     $admin = admin::where('email','=',$request->email)->first();
    //     if($admin){
    //         if($request->password==$admin->password){
    //             return response([
    //                 'message' => 'Login Success',
    //                 'status'=>'success'
    //             ], 200);
    //         }
    //     }
    //     return response([
    //         'message' => 'The Provided Credentials are incorrect',
    //         'status'=>'failed'
    //     ], 401);
    // }
    

    public function show()
    {
        $admin = Admin::all();
        return response()->json($admin);
    }
}
