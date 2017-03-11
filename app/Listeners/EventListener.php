<?php

namespace App\Listeners;

use App\Events\OrderEvent;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Mail\Message;

class EventListener {

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
	 * @param  OrderEvent  $event
	 * @return void
	 */
	public function handle(OrderEvent $event) {
		$this->mailer->send('emails.order-confirmation', [
			'data' => $event->getCustomerData(),
			'items' => $event->getItems(),
			], function(Message $message) use ($event) {
			$message->from('noreply@winzerhof-wurst.at', 'Winzerhof Wurst');
			// TODO: $message->bcc('office@winzerhof-wurst.at');
			$message->to($event->getCustomerData()['email']);
			$message->subject('Bestätigung Ihrer Bestellung auf www.winzerhof-wurst.at');
		});
	}

}
