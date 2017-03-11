<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Queue\SerializesModels;

class OrderEvent extends Event {

	use SerializesModels;

	/** @var array */
	private $customerData;

	/** @var array */
	private $items;

	/**
	 * @param array $customerData
	 * @param array $items
	 */
	public function __construct(array $customerData, Collection $items) {
		$this->customerData = $customerData;
		$this->items = $items;
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
	public function getCustomerData() {
		return $this->customerData;
	}

	/**
	 * @return Collection
	 */
	public function getItems() {
		return $this->items;
	}

}
