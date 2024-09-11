<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'product_images'; // Specify the correct table name
    protected $fillable = ['product_id', 'image_url'];

    // Define the inverse relationship with the Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
