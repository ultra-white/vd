<?php

use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::get('/products', function () {
    return Product::select('id', 'image', 'name', 'price')
        ->get()
        ->map(function ($product) {
            return [
                'id' => $product->id,
                'slug' => '/product/' . $product->id,
                'image' => asset('storage/' . $product->image),
                'name' => $product->name,
                'price' => $product->price,
            ];
        });
});

Route::get('/product/{id}', [ProductController::class, 'show']);
