<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Item;
use App\Order;
use App\Wine;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller {

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param int $dbWwines
	 * @return Response
	 */
	public function store(Request $request) {
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

		DB::transaction(function () use ($customerData, $wines, $comment) {
			$customer = Customer::create($customerData);
			$order = new Order();
			$order->comment = $comment;
			$customer->orders()->save($order);

			foreach ($wines as $wineData) {
				if (!isset($wineData['quantity']) ||
					0 === (int) $wineData['quantity']) {
					continue;
				}
				$wine = Wine::find($wineData['id']);

				$item = new Item();
				$item->name = $wine->name;
				$item->price = $wine->price;
				$item->tax_rate = $wine->tax_rate;
				$item->qty = $wineData['quantity'];

				$order->items()->save($item);
				$wine->items()->save($item);
			}
		});
	}

}
