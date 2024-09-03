<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['name', 'email', 'password', 'tenant_id'];

    public function tenant() {
        return $this->belongsTo(Tenant::class);
    }

    public function roles() {
        return $this->belongsToMany(Role::class);
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

    public function hasAnyRole($roles) {
        return $this->roles()->whereIn('name', $roles)->exists();
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'tenant_id', 'tenant_id');
    }
}
