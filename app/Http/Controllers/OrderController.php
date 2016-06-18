<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class OrderController extends Controller {

    /**
     * Store a newly created resource in storage.
     *
     * @param int $x
     * @return Response
     */
    public function store($x) {
        error_log($x);
    }

}
