<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    public function users() {
        return $this->hasMany(User::class);
    }

    public function subscriptions() {
        return $this->hasMany(Subscription::class);
    }

    public function invoices() {
        return $this->hasMany(Invoice::class);
    }

    public function notifications() {
        return $this->hasMany(Notification::class);
    }
}
