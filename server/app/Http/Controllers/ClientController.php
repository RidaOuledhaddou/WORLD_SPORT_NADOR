<?php

namespace App\Http\Controllers;

use Socialite;
use App\Models\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\HTTP;
use Carbon\Carbon;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    public function getClientInfo(Request $request)
    {
        $client = Client::where('email', $request->query('email'))->first();
        if ($client) {
            return response()->json($client);
        } else {
            return response()->json(['message' => 'Client not found'], 404);
        }
    }

    public function Show_Customers()
    {
        $clients = Client::select('username', 'email', 'phone_number')
                         ->orderBy('created_at', 'desc') // Ordering by creation time, most recent first
                         ->limit(3) // Limiting the results to the last 3 clients
                         ->get();
        return response()->json($clients);
    }




    
        public function login_user(Request $request)
        {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
    
            $client = Client::where('email', $request->email)->first();
    
            if ($client && Hash::check($request->password, $client->password)) {
                return response([
                    'message' => 'Login Success',
                    'status' => 'success',
                ], 200);
            }
    
            return response([
                'message' => 'The provided credentials are incorrect',
                'status' => 'failed',
            ], 401);
        }
    
        public function Signin_user(Request $request)
        {
            $request->validate([
                'username' => 'required|unique:clients,username', // Ensure unique username
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email|unique:clients,email', // Add unique validation for email
                'password' => 'required|min:8', // Add validation for password
                'conf_password' => 'required|same:password', // Add validation for confirming password
                'address' => 'nullable|string',
                'phone_number' => 'nullable|string',
            ]);
    
            $client = new client();
            $client->username = $request->username;
            $client->first_name = $request->first_name;
            $client->last_name = $request->last_name;
            $client->email = $request->email;
            $client->password = Hash::make($request->password); // Hash the password before storing
            $client->address = $request->address;
            $client->phone_number = $request->phone_number;
            $client->save();
    
            return response()->json(['message' => 'User created successfully'], 201);
        }
    
        
    
    public function redirectToGoogle()
{
    $query = http_build_query([
        'client_id' => '52010156302-ei23kiqv3o617vokpsl7ej1uu6l1di63.apps.googleusercontent.com',
        'redirect_uri' => 'http://localhost:5173', // Update with your actual redirect URI
        'response_type' => 'code',
        'scope' => 'email profile',
    ]);

    return redirect('https://accounts.google.com/o/oauth2/auth?' . $query);
}

public function handleGoogleCallback(Request $request)
{
    try {
        $tokenResponse = Http::post('https://oauth2.googleapis.com/token', [
            'code' => $request->get('code'),
            'client_id' => '52010156302-ei23kiqv3o617vokpsl7ej1uu6l1di63.apps.googleusercontent.com',
            'client_secret' => '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', // Update with your actual client secret
            'redirect_uri' => 'http://localhost:5173', // Update with your actual redirect URI
            'grant_type' => 'authorization_code',
        ]);

        $accessToken = $tokenResponse->json()['access_token'];

        $userResponse = Http::get('https://www.googleapis.com/oauth2/v1/userinfo', [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken,
            ],
        ]);

        $user = $userResponse->json();

        // Check if the user already exists
        $existingUser = Client::where('email', $user['email'])->first();

        if ($existingUser) {
            Auth::login($existingUser);
        } else {
            // Create a new user
            $newUser = Client::create([
                'username' => $user['id'],
                'first_name' => $user['name'],
                'last_name' => '',
                'email' => $user['email'],
                'password' => encrypt('my-google'), // You should use a more secure method for password hashing
            ]);

            Auth::login($newUser);
        }

        return redirect()->intended('dashboard');
    } catch (\Exception $e) {
        // Handle exceptions or errors here
        return redirect()->route('login')->with('error', 'Failed to authenticate with Google. Please try again.');
    }
    }
  
    public function getClientByToken(Request $request)
{
    $guestToken = htmlspecialchars($request->input('guest_token'), ENT_QUOTES, 'UTF-8');
    $ipAddress = $request->ip();

    if ($guestToken) {
        $client = Client::where('guest_token', $guestToken)
                        ->where('ip_address', $ipAddress)
                        ->first();
        if ($client) {
            return response()->json($client);
        }
    }

    return response()->json(['message' => 'Client not found'], 404);
}

    


    
    public function Show_Customer_all(){
        $customers = Client::orderBy('created_at', 'desc')->get();
        return response()->json($customers);
    }



    public function increment()
    {
        // Check if the record exists, if not, create it
        $visit = DB::table('visitors')->where('id', 1)->first();
        if (!$visit) {
            DB::table('visitors')->insert(['id' => 1, 'count' => 0]);
        }
    
        // Increment the visit count
        DB::table('visitors')->where('id', 1)->increment('count');
    
        // Retrieve the updated count
        $visit = DB::table('visitors')->where('id', 1)->first();
        
        return response()->json(['visits' => $visit->count]);
    }
    
    public function getDailyVisits()
    {
        $now = Carbon::now();
        $weekAgo = $now->copy()->subDays(7);
    
        $dailyVisits = DB::table('visitors')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(count) as count'))
            ->whereBetween('created_at', [$weekAgo, $now])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date')
            ->toArray();
    
        $dates = [];
        for ($date = $weekAgo; $date <= $now; $date->addDay()) {
            $dates[$date->format('Y-m-d')] = $dailyVisits[$date->format('Y-m-d')]->count ?? 0;
        }
    
        return response()->json(['data' => $dates]);
    }
}
