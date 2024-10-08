<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    public function tenant() {
        return $this->belongsTo(Tenant::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function plan() {
        return $this->belongsTo(Plan::class);
    }

    public function invoices() {
        return $this->hasMany(Invoice::class);
    }
}
