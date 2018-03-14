<?php

namespace App\Providers;

use App\Events\BookingEvent;
use App\Events\OrderEvent;
use App\Listeners\BookingEventListener;
use App\Listeners\OrderEventListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ESP;

class EventServiceProvider extends ESP {

	/**
	 * The event listener mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = [
		BookingEvent::class => [
			BookingEventListener::class,
		],
		OrderEvent::class => [
			OrderEventListener::class,
		],
	];

}
