<?php

namespace App\Providers;

use App\Events\OrderEvent;
use App\Listeners\EventListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ESP;

class EventServiceProvider extends ESP {

	/**
	 * The event listener mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = [
		OrderEvent::class => [
			EventListener::class,
		],
	];

}
