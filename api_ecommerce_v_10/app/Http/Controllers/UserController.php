<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $state = $request->get("state");
        $search = $request->get("search");
        $category = $request->get("category");
        $company_id = $request->get("company_id");
        $user = auth('api')->user();

        $query = User::filterAdvance($state, $search, $category)->with('role', 'company');

        if (!$user->hasPermission('manage_companies') && $user->company_id) {
            $query->where('company_id', $user->company_id);
        } else if ($user->hasPermission('manage_companies') && $company_id) {
            $query->where('company_id', $company_id);
        }

        $users = $query->orderBy("id", "desc")->paginate(20);

        return response()->json([
            "total" => $users->total(),
            "users" => $users,
        ]);
    }

    public function groupedByCompany(Request $request)
    {
        $state = $request->get("state");
        $search = $request->get("search");

        $query = \App\Models\Company::with([
            'users' => function ($q) use ($state, $search) {
                $q->with('role');
                if ($state) {
                    $q->where("state", $state);
                }
                if ($search) {
                    $q->where(function ($query) use ($search) {
                        $query->where("name", "like", "%" . $search . "%")
                            ->orWhere("surname", "like", "%" . $search . "%")
                            ->orWhere("email", "like", "%" . $search . "%");
                    });
                }
                $q->orderBy('id', 'desc');
            }
        ])->whereHas('users', function ($q) use ($state, $search) {
            if ($state) {
                $q->where("state", $state);
            }
            if ($search) {
                $q->where(function ($query) use ($search) {
                    $query->where("name", "like", "%" . $search . "%")
                        ->orWhere("surname", "like", "%" . $search . "%")
                        ->orWhere("email", "like", "%" . $search . "%");
                });
            }
        });

        $companies = $query->orderBy('name', 'asc')->paginate(10);

        return response()->json([
            "total" => $companies->total(),
            "companies" => $companies,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $user = User::where("email", $request->email)->first();
        if ($user) {
            return response()->json(["message" => 400, "error" => "Email already exists"], 400);
        } else {
            $data = $request->all();
            $authUser = auth('api')->user();

            if (!$authUser->hasPermission('manage_companies') && $authUser->company_id) {
                $data['company_id'] = $authUser->company_id;
            }

            $user = User::create($data);
            return response()->json(["message" => 200, "user" => $user]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $userExists = User::where("email", $request->email)->where("id", "<>", $id)->first();
        if ($userExists) {
            return response()->json(["message" => 400, "error" => "Email already exists"], 400);
        } else {
            $user = User::findOrFail($id);
            $authUser = auth('api')->user();

            if (!$authUser->hasPermission('manage_companies') && $user->company_id != $authUser->company_id) {
                return response()->json(["message" => 403, "error" => "No tienes permiso para editar este usuario."], 403);
            }

            $data = $request->all();
            if (!$authUser->hasPermission('manage_companies') && $authUser->company_id) {
                $data['company_id'] = $authUser->company_id;
            }

            $user->update($data);
            return response()->json(["message" => 200, "user" => $user]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $authUser = auth('api')->user();

        if (!$authUser->hasPermission('manage_companies') && $user->company_id != $authUser->company_id) {
            return response()->json(["message" => 403, "error" => "No tienes permiso para eliminar este usuario."], 403);
        }

        $user->delete();
        return response()->json(["message" => 200]);
    }
}
