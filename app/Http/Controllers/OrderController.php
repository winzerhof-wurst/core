<?php

/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016-2017
 */

namespace App\Http\Controllers;

use App\Shop\Shop;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class OrderController extends Controller {

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store(Request $request, Shop $shop) {
		$customerData = $request->only([
			'firstname',
			'lastname',
			'street',
			'nr',
			'zipcode',
			'city',
			'email'
		]);
		$wines = $request->get('wines', []);
		$comment = $request->get('comment', '');
		$shop->saveOrder($customerData, $wines, $comment);
	}

}
