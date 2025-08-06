<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PromocodeUsage extends Model
{
    protected $fillable = [
        'promocode_id',
        'order_id',
    ];

    public function promocode(): BelongsTo
    {
        return $this->belongsTo(Promocode::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
