<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wine extends Model {

	public function items() {
		return $this->morphMany(Item::class, 'product');
	}

}
