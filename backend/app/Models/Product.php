<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'image', 'quantity'];

    public function images() {
        return $this->hasMany(ProductImage::class);
    }

    public function details() {
        return $this->hasOne(ProductDetail::class);
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }

    protected static function booted(): void
    {
        static::deleting(function (Product $product) {
            // Удалить основное изображение
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }

            foreach ($product->images as $image) {
                if ($image->path && Storage::disk('public')->exists($image->path)) {
                    Storage::disk('public')->delete($image->path);
                }
                $image->delete();
            }
        });
    }
}
