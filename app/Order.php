<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model {

	public function customer() {
		return $this->hasOne(Customer::class);
	}

	public function items() {
		return $this->hasMany(Item::class);
	}

}
