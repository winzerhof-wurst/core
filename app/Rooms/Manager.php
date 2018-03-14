<?php

/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

namespace App\Rooms;

use App\Customer;
use App\Events\BookingEvent;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\DB;

class Manager {

	/** @var Dispatcher */
	private $eventDispatcher;

	/**
	 * @param Dispatcher $eventDispatcher
	 */
	public function __construct(Dispatcher $eventDispatcher) {
		$this->eventDispatcher = $eventDispatcher;
	}

	public function saveBookingRequest(array $bookingData) {
		DB::transaction(function () use ($bookingData) {
			Customer::create($bookingData);

			$this->eventDispatcher->fire(new BookingEvent($bookingData));
		});
	}

}
