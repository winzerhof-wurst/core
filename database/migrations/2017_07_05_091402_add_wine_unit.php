<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class AddWineUnit extends Migration {

	/**
	 * @return void
	 */
	public function up() {
		Schema::table('wines', function ($table) {
			$table->string('unit')->nullable();
		});
	}

	/**
	 * @return void
	 */
	public function down() {
		Schema::table('wines', function ($table) {
			$table->dropColumn('unit');
		});
	}

}
