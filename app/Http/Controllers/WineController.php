<?php

namespace App\Http\Controllers;

use App\Wine;
use Symfony\Component\HttpFoundation\JsonResponse;

class WineController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index() {
        return Wine::where('available', true)->get();
    }

}
