<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model {

	protected $fillable = [
		'firstname',
		'lastname',
		'street',
		'nr',
		'zipcode',
		'city',
		'telephone',
		'fax',
		'email',
	];

	public function orders() {
		return $this->hasMany(Order::class);
	}

}
