<?php

// app/Http/Controllers/OrderController.php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['client', 'items.product'])
            ->orderByRaw("CASE WHEN status = 'pending' THEN 0 ELSE 1 END, created_at DESC")
            ->limit(5)
            ->get();
    
        return response()->json($orders);
    }

    public function getTotalQuantity()
    {
        $totalQuantity = DB::table('order_items')->sum('quantity');

        return response()->json([
            'total_quantity' => $totalQuantity
        ]);
    }

    public function getTotalRevenue()
    {
        $totalAmount = DB::table('orders')
            ->where('status', 'delivered')
            ->sum('total_amount');
    
        return response()->json([
            'totalAmount' => $totalAmount
        ]);
    }
    

    
    public function Requests_all()
    {
        // Fetch all requests
        $requests = Order::all();

        // Compute the total number of requests
        $totalRequests = $requests->count();

        // Return the requests and total number of requests as a JSON response
        return response()->json([
            'requests' => $requests,
            'totalRequests' => $totalRequests,
        ]);
    }

    public function Show_orders_all()
    {
        // Fetch only orders with 'pending' status
        $orders = Order::with(['client', 'items.product:id,name,description,price'])  // Add this line
                       ->orderBy('created_at', 'desc')
                       ->get();
    
        return response()->json($orders);
    }

    
    public function update_order_status(Request $request, $orderId)
{

    $order = Order::findOrFail($orderId);
    $order->status = $request->status;
    $order->save();

    return response()->json([
        'message' => 'Order status updated successfully!',
        'order' => $order
    ]);
}


    

    public function Show_order_id($id)
    {
        try {
            $order = Order::with(['client', 'items.product:id,name,description,price'])
                          ->where('id', $id)
                          ->firstOrFail();  // This will throw an exception if no order is found
    
            return response()->json($order);
        } catch (\Exception $e) {
            Log::error("Order fetch failed: " . $e->getMessage());  // Log the error
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
    

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'client.username' => 'required|string',
                'client.email' => 'required|email',
                'client.phone' => 'required|string',
                'client.address' => 'required|string',
                'items' => 'required|array',
                'items.*.product_id' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
            ]);

            // Generate a guest token if not provided
            $guestToken = $request->cookie('guest_token') ?? bin2hex(random_bytes(16));

            // Check if client already exists using guest token or email
            $client = Client::where('guest_token', $guestToken)
                ->orWhere('email', $validatedData['client']['email'])
                ->first();

            if ($client) {
                // Client exists, update without changing the password
                $client->update([
                    'username' => $validatedData['client']['username'],
                    'phone_number' => $validatedData['client']['phone'],
                    'address' => $validatedData['client']['address'],
                    'guest_token' => $guestToken,
                ]);
            } else {
                // Client does not exist, create a new one
                $client = new Client([
                    'email' => $validatedData['client']['email'],
                    'username' => $validatedData['client']['username'],
                    'phone_number' => $validatedData['client']['phone'],
                    'address' => $validatedData['client']['address'],
                    'guest_token' => $guestToken,
                ]);

                $client->save();
            }

            $totalAmount = 0;
            $orderItems = [];
            foreach ($validatedData['items'] as $item) {
                $product = Product::find($item['product_id']);
                if (!$product) {
                    return response()->json(['message' => 'Product not found'], 404);
                }
                $totalAmount += $product->price * $item['quantity'];
                $orderItems[] = [
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                ];
            }

            $order = Order::create([
                'client_id' => $client->id,
                'total_amount' => $totalAmount,
                'status' => 'pending',
            ]);

            foreach ($orderItems as $orderItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $orderItem['product_id'],
                    'quantity' => $orderItem['quantity'],
                    'unit_price' => $orderItem['unit_price'],
                ]);
            }

            return response()->json([
                'order' => $order->load('items'),
                'guest_token' => $client->guest_token,
                'message' => 'Order created successfully',
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while creating the order', 'error' => $e->getMessage()], 500);
        }
    }

    public function cancel(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        if ($order->status == 'cancelled') {
            return response()->json(['message' => 'Order is already cancelled'], 400);
        }

        $order->cancel();

        return response()->json(['message' => 'Order cancelled successfully', 'order' => $order], 200);
    }


    public function getSalesData()
{
    // Fetch sales data from database
    $salesData = DB::table('orders')
                    ->selectRaw('SUM(total_amount) as total, DATE(created_at) as date')
                    ->groupBy('date')
                    ->orderBy('date', 'asc')
                    ->get();

    // Format data for the frontend
    $formattedData = [
        'title' => 'Sales',
        'color' => [
            'backGround' => 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
            'boxShadow' => '0px 10px 20px 0px #e0c6f5'
        ],
        'barValue' => 70, // Example static value, calculate based on requirements
        'value' => number_format($salesData->sum('total'), 2), // Assuming 'amount' is the field to sum up
        'png' => 'UilUsdSquare', // Assuming this is a constant or calculated value
        'series' => [
            [
                'name' => 'Sales',
                'data' => $salesData->pluck('total')->all()
            ],
        ],
    ];

    return response()->json($formattedData);
}
}
