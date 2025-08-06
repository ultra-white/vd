<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Promocode extends Model
{
    protected $fillable = [
        'expire_date',
        'usage_limit',
        'code',
    ];

    protected $casts = [
        'expire_date' => 'datetime',
        'usage_limit' => 'integer',
    ];

    public function promocodeUsages(): HasMany
    {
        return $this->hasMany(PromocodeUsage::class);
    }
}
