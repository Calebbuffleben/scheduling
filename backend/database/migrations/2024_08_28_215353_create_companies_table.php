<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('company_email');
            $table->string('company_phone_number')->nullable();
            $table->string('company_city')->nullable();
            $table->string('company_address');
            $table->string('company_address_number')->nullable();
            $table->string('company_complement')->nullable();
            $table->string('company_website')->nullable();
            $table->foreignId('tenant_id')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
