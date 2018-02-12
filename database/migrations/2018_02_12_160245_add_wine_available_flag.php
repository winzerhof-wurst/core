<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class AddWineAvailableFlag extends Migration {

	/**
	 * @return void
	 */
	public function up() {
		Schema::table('wines', function ($table) {
			$table->boolean('available')->default(true);
		});
	}

	/**
	 * @return void
	 */
	public function down() {
		Schema::table('wines', function ($table) {
			$table->dropColumn('available');
		});
	}

}
