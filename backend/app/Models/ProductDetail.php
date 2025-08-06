<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductDetail extends Model
{
    protected $fillable = [
        'product_id',
        'description',
        'structure',
        'season',
        'product_parametrs',
        'model_parametrs',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
