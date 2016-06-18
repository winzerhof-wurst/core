<?php

namespace App\Http\Controllers;

use App\Tidbit;
use Illuminate\Http\JsonResponse;

class TidbitController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index() {
        return Tidbit::all();
    }

}
