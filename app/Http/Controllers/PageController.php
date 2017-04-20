<?php

namespace App\Http\Controllers;

use function view;

class PageController extends Controller {

	public function index() {
		return view('home');
	}

}
