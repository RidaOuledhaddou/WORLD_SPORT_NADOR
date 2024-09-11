<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    protected $fillable = ['product_id','end_date','old_price','price'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
