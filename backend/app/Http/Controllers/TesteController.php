<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class TesteController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Hello, this is a test API from the controller!'
        ]);
    }

     public function getItems (Request $request)
     {
        $page = $request->query('page', 1);
        $sort = $request->query('sort', 'asc');
     }
}
