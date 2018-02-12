<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class AddWineOutOfStockFlag extends Migration {

	/**
	 * @return void
	 */
	public function up() {
		Schema::table('wines', function ($table) {
			$table->boolean('out_of_stock')->default(false);
		});
	}

	/**
	 * @return void
	 */
	public function down() {
		Schema::table('wines', function ($table) {
			$table->dropColumn('out_of_stock');
		});
	}

}
