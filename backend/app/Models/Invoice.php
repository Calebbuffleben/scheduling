<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    public function tenant() {
        return $this->belongsTo(Tenant::class);
    }

    public function subscription() {
        return $this->belongsTo(Subscription::class);
    }
}
