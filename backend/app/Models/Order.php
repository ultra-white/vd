<?php

namespace App\Models;

use App\Enums\PaymentMethod;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'phone',
        'email',
        'address',
        'payment_method',
        'promocode_id',
    ];

    protected $casts = [
        'payment_method' => PaymentMethod::class,
    ];

    /**
     * Товары в заказе
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Промокод, применённый к заказу
     */
    public function promocode(): BelongsTo
    {
        return $this->belongsTo(Promocode::class);
    }

    /**
     * Запись использования промокода (один заказ = одно использование)
     */
    public function promocodeUsage(): HasMany
    {
        return $this->hasMany(PromocodeUsage::class);
    }
}
