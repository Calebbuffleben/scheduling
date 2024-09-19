<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function store (Request $request)
    {
        $request->validate([
            'companyName' => 'required|string',
            'email' => 'required|string',
            'companyCity' => 'string',
            'address' => 'required|string',
            'addressNumber' => 'string',
            'complement' => 'string',
            'website' => 'string',
            'phoneNumber' => 'string'
        ]);

        $company = Company::create([
            'company_name' => $request->input('companyName'),
            'company_email' => $request->input('email'),
            'company_city' => $request->input('companyCity'),
            'company_address' => $request->input('address'),
            'company_address_number' => $request->input('addressNumber'),
            'company_complement' => $request->input('complement'),
            'company_website' => $request->input('website'),
            'company_phone_number' => $request->input('phoneNumber'),
            'tenant_id' => Str::uuid(),
        ]);

        return response()->json([
            'message' => 'Company registered successfully',
            'company' => $company,
        ], 200);
    }
}
