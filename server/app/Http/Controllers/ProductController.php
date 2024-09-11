<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Flavor;
use App\Models\Deal;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    
    public function add_product(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'information' => 'nullable|string',
            'old_price' => 'nullable|numeric',
            'price' => 'required|numeric',
            'status' => 'required|string|max:255',
            'description' => 'required|string',
            'review' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
            'stock_quantity' => 'required|integer',
            'main_image_url' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'flavors' => 'required',
            'flavors.*' => 'required',
            'category' => 'required',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        DB::beginTransaction();
        try {
            $product = new Product();
            $product->name = $request->input('name');
            $product->subtitle = $request->input('subtitle');
            $product->information = $request->input('information');
            $product->old_price = $request->input('old_price');
            $product->price = $request->input('price');
            $product->status = $request->input('status');
            $product->description = $request->input('description');
            $product->review = $request->input('review');
            $product->brand = $request->input('brand');
            $product->stock_quantity = $request->input('stock_quantity');
        
            // image file upload
            if ($request->hasFile('main_image_url')) {
                $imagePath = $request->file('main_image_url')->store('products');
                $product->main_image_url = $imagePath;
            }
        
            $product->save();
    
            // Insert into product_flavor table manually
            foreach ($validated['flavors'] as $flavor_id) {
                DB::table('product_flavors')->insert([
                    'product_id' => $product->id,
                    'flavor_id' => $flavor_id
                ]);
        }
            DB::table('product_categories')->insert([
                'product_id' => $product->id,
                'category_id' => $request->category
            ]);

            $images = $request->file('images');
            $paths = [];
        
            if ($request->hasFile('images')) {
                foreach ($images as $image) {
                    // Store image and generate the path
                    $path = $image->store('products');
                    $fullPath = $path; // This generates the full URL to access the file
        
                    // Insert image path along with product ID into database
                    DB::table('product_images')->insert([
                        'product_id' => $product->id,
                        'image_path' => $fullPath
                    ]);
        
                    $paths[] = $fullPath; // Optionally collect paths to return in the response
                }
            }
    
            DB::commit();
            return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    
    }
    
    

    public function update(Request $request, $id)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'subtitle' => 'nullable|string|max:255',
        'information' => 'nullable|string',
        'old_price' => 'nullable|numeric',
        'price' => 'required|numeric',
        'status' => 'required|string|max:255',
        'description' => 'required|string',
        'review' => 'nullable|string',
        'brand' => 'nullable|string|max:255',
        'stock_quantity' => 'required|integer',
        'main_image_url' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'flavors' => 'required',
        'flavors.*' => 'required',
        'category' => 'required',
        'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);
    

        Log::info('Validated data:', $validated);

        DB::beginTransaction();
        try {
            $product = Product::findOrFail($id);
            $product->name = $request->input('name');
            $product->subtitle = $request->input('subtitle');
            $product->information = $request->input('information');
            $product->old_price = $request->input('old_price');
            $product->price = $request->input('price');
            $product->status = $request->input('status');
            $product->description = $request->input('description');
            $product->review = $request->input('review');
            $product->brand = $request->input('brand');
            $product->stock_quantity = $request->input('stock_quantity');
        

            // Handle image file upload
            if ($request->hasFile('main_image_url')) {
                $imagePath = $request->file('main_image_url')->store('products', 'public');
                $product->main_image_url = Storage::url($imagePath);
                $product->save();
            }

    $product->update();
 
    DB::table('product_flavors')->where('product_id', $product->id)->delete();
    foreach ($validated['flavors'] as $flavor_id) {
        DB::table('product_flavors')->insert([
            'product_id' => $product->id,
            'flavor_id' => $flavor_id
        ]);
    }

    // Updating category (assuming one category per product)
    DB::table('product_categories')->where('product_id', $product->id)->update([
        'category_id' => $request->category
    ]);

    // Updating images
    $images = $request->file('images');
    $paths = [];
    if ($request->hasFile('images')) {
        DB::table('product_images')->where('product_id', $product->id)->delete();
        foreach ($images as $image) {
            $path = $image->store('uploads', 'public');
            $fullPath = Storage::url($path);

            // Insert image path along with product ID into database
            DB::table('product_images')->insert([
                'product_id' => $product->id,
                'image_path' => $fullPath
            ]);

            $paths[] = $fullPath;
        }
    }

        
                DB::commit();
                return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);
            } catch (\Exception $e) {
                DB::rollBack();
                return response()->json(['error' => $e->getMessage()], 400);
            }
}

    public function delete($id)
    {
            $product = Product::find($id);
            $product->delete();
            return response()->json();
    }


        public function show_product()
    {
        $products = Product::all();
        return response()->json($products);
    }





    public function add_categories(Request $request)
    {
        $Category = new Category();
        $Category->name = $request->input('name');
        $Category->save();

        return response()->json([
            'message' => 'Category add successfully',
        ], 200);
    }

    public function info_categories()
    {
        $category = Category::all();
        return response()->json($category);
    }


    public function delete_categorie($id)
    {
            $category = Category::find($id);
            $category->delete();
            return response()->json();
    }




    public function add_flavors(Request $request)
    {
        $Flavor = new Flavor();
        $Flavor->name = $request->input('name');
        $Flavor->save();

        return response()->json([
            'message' => 'Flavor add successfully',
        ], 200);
    }

    public function info_flavors()
    {
        $Flavors = Flavor::all();
        return response()->json($Flavors);
    }


    public function delete_flavor($id)
    {
            $Flavor = Flavor::find($id);
            $Flavor->delete();
            return response()->json();
    }


    public function getProductByIdUpdate($id)
    {
        $product = Product::with(['categories', 'images', 'flavors'])->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function getProductsByCategory(Request $request, $category)
    {
        // Retrieve the limit from the request, default to null if not provided
        $limit = $request->input('limit');
    
        // Build the query based on the category
        if ($category === 'all_products') {
            $query = Product::query(); // No category filter
        } elseif ($category === 'top-sellers') {
            // Query for the top-selling products
            $query = Product::withCount(['orderItems' => function ($query) {
                $query->select(DB::raw('SUM(quantity)'));
            }])->orderBy('order_items_count', 'desc')->limit(10);
        } elseif ($category === 'all_deals') {
            // Fetch deals
            $deals = Deal::all(); // Assuming deals are in the Deal model
            return response()->json($deals);
        } else {
            $query = Product::whereHas('categories', function ($query) use ($category) {
                $query->where('name', $category);
            });
        }
    
        // Apply the limit if it is provided and not top-sellers
        if ($limit && $category !== 'top-sellers') {
            $query->limit($limit);
        }
    
        // Get the products
        $products = $query->get();
    
        // Return the products as JSON
        return response()->json($products);
    }

// In your ProductController.php


    

    
    
    public function getHomeProduct()
{
    // Define the categories to filter products
    $categories = ['top-sellers', 'WHEY PROTEIN', 'CREATINE'];

    // Fetch products with any of the specified categories
    $groupedProducts = [];
    foreach ($categories as $category) {
        if ($category === 'top-sellers') {
            // Query for the top-selling products
            $productsByCategory = Product::withCount(['orderItems' => function ($query) {
                $query->select(DB::raw('SUM(quantity)'));
            }])->orderBy('order_items_count', 'desc')->limit(4)->get();
        } else {
            $productsByCategory = Product::select('categories.name as category_name', 'products.*')
                ->join('product_categories', 'products.id', '=', 'product_categories.product_id')
                ->join('categories', 'product_categories.category_id', '=', 'categories.id')
                ->where('categories.name', $category)
                ->take(4) // Limit the number of products per category to 4
                ->get();
        }

        // Group products by category
        $groupedProducts[$category] = $productsByCategory;
    }

    return response()->json($groupedProducts);
}

    
    public function getProductById($id)
    {
        $product = Product::with(['categories', 'images', 'flavors'])->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }
    




    public function ProductsCustomer_all()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        return response()->json($products);
    }



    public function search_Pro(Request $request, $search)
    {
        $query = Product::query();
        
        if (!empty($search)) {
            $query->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('subtitle', 'LIKE', "%{$search}%")
                  ->orWhere('price', 'LIKE', "%{$search}%")
                  ->orWhere('old_price', 'LIKE', "%{$search}%");
        }
    
        return $query->get();
    }


     // Function to get all products and return the add deal view
       public function showAddDealForm()
       {
           $products = Product::all(['id', 'name']); // Select only necessary fields
           return response()->json($products);
       }

   
       public function ADD_DEAL(Request $request)
       {
           $validatedData = $request->validate([
               'product_id' => 'required|integer',
               'end_date' => 'required|date|after:today',
               'old_price' => 'required|numeric',
               'price' => 'required|numeric'
           ]);
       
           $deal = Deal::create($validatedData);
       
           return response()->json(['message' => 'Deal added successfully', 'deal' => $deal], 201);
       }
       

       public function index_Deals()
{
    try {
        // Fetch active and upcoming deals with their associated products
        $deals = Deal::with('product')
            ->where('end_date', '>=', now()->startOfDay())
            ->limit(4)
            ->get();
        return response()->json($deals);
    } catch (\Exception $e) {
        // Return error message if any exception occurs
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

       



}
