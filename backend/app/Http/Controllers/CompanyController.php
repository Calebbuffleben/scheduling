<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function store (Request $request)
    {
        $request->validate([
            'company_name' => 'required|string'
        ]);

        $company = Company::create([
            'company_name' => $request->input('company_name'),
            'tenant_id' => Str::uuid(),
        ]);

        return response()->json([
            'message' => 'Company registered successfully',
            'company' => $company,
        ], 200);
    }
}
