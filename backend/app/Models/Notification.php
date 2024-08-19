<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    public function tenant() {
        return $this->belongsTo(Tenant::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
