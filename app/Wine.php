<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wine extends Model {

	public function items() {
		return $this->morphMany(Item::class, 'product');
	}

	public function getTextAttribute($value) {
		return nl2br($value);
	}

}
