<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json($user, 201);
    }

    public function getUsers(Request $request)
    {
        $count = intval($request->query('count', 10));
        $sort = $request->query('sort', 'asc');
        $field = $request->query('field', 'name');

        if ($count <= 0) {
            return response()->json(['message' => 'Invalid count parameter'], 400);
        }

        $users = User::orderBy($field, $sort)->limit($count)->get();

        return response()->json($users, 200);
    }
}
