<?php

namespace App\Listeners;

use App\Events\BookingEvent;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Log;

class BookingEventListener {

	/** @var Mailer */
	private $mailer;

	/**
	 * @param Mailer $mailer
	 */
	public function __construct(Mailer $mailer) {
		$this->mailer = $mailer;
	}

	/**
	 * Handle the event.
	 *
	 * @param  BookingEvent  $event
	 * @return void
	 */
	public function handle(BookingEvent $event) {
		$this->mailer->send('emails.booking-confirmation', [
			'data' => $event->getBookingData(),
			], function(Message $message) use ($event) {
			$message->from('noreply@winzerhof-wurst.at', 'Winzerhof Wurst');
			$message->bcc('office@winzerhof-wurst.at');
			$message->to($event->getBookingData()['email']);
			$message->subject('Bestätigung Ihrer Zimmeranfrage auf www.winzerhof-wurst.at');
		});
		Log::info('booking mail sent');
	}

}
