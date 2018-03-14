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

namespace App\Events;

use Illuminate\Queue\SerializesModels;

class BookingEvent {

	use SerializesModels;

	/** @var array */
	private $bookingData;

	public function __construct(array $bookingData) {
		$this->bookingData = $bookingData;
	}

	/**
	 * Get the channels the event should be broadcast on.
	 *
	 * @return array
	 */
	public function broadcastOn() {
		return [];
	}

	/**
	 * @return array
	 */
	public function getBookingData() {
		return $this->bookingData;
	}

}
