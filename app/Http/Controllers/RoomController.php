<?php

/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2018
 */

namespace App\Http\Controllers;

use App\Rooms\Manager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class RoomController extends Controller {

	/**
	 * Save a room request
	 *
	 * @return Response
	 */
	public function store(Request $request, Manager $manager) {
		$bookingData = $request->only([
			'date',
			'stays',
			'persons',
			'rooms',
			'firstname',
			'lastname',
			'telephone',
			'email',
		]);
		$manager->saveBookingRequest($bookingData);
	}

}
