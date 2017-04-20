<?php

namespace App\Http\Controllers;

use Exception;
use function view;

class PageController extends Controller {

	public function index() {
		throw new Exception();
		return view('home');
	}

}
