<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class AddWinesOrder extends Migration {

	/**
	 * @return void
	 */
	public function up() {
		Schema::table('wines', function ($table) {
			$table
				->integer('order')
				->unsigned()
				->default(1);
		});
	}

	/**
	 * @return void
	 */
	public function down() {
		Schema::table('wines', function ($table) {
			$table->dropColumn('order');
		});
	}

}
