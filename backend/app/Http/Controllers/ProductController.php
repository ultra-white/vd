<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function show($id)
    {
        $product = Product::with(['images', 'details'])->where('id', $id)->first();

        if (!$product) {
            return response()->json(['message' => 'Товар не найден'], 404);
        }

        return response()->json([
            'name' => $product->name,
            'price' => $product->price,
            'image' => asset('storage/' . $product->image),
            'images' => $product->images->map(fn($img) => asset('storage/' . $img->path)) ?? '',
            'details' => [
                'description' => $product->details->description ?? '',
                'structure' => $product->details->structure ?? '',
                'season' => $product->details->season ?? '',
                'product_parameters' => $product->details->product_parameters ?? '',
                'model_parameters' => $product->details->model_parameters ?? '',
            ]
        ]);
    }
}
