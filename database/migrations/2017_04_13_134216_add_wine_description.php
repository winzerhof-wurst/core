<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class AddWineDescription extends Migration {

	/**
	 * @return void
	 */
	public function up() {
		Schema::table('wines', function ($table) {
			$table->string('description');
			$table->string('text')->nullable();
		});
	}

	/**
	 * @return void
	 */
	public function down() {
		Schema::table('wines', function ($table) {
			$table->dropColumn('description');
			$table->dropColumn('text');
		});
	}

}
