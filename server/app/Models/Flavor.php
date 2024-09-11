<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flavor extends Model
{
    protected $fillable = ['name'];

    // Define the many-to-many relationship with the Product
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_flavors');
    }
}
