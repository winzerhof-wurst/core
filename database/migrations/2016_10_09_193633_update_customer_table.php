<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCustomerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::table('customers', function (Blueprint $table) {
			$table->renameColumn('first_name', 'firstname');
			$table->renameColumn('last_name', 'lastname');

			$table->string('street', 100);
			$table->string('nr', 10);
			$table->integer('zipcode')->unsigned();
			$table->string('city', 100);
			$table->string('telephone', 30);
			$table->string('fax', 30);
			$table->string('email', 100);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::table('customers', function ($table) {
			$table->renameColumn('firstname', 'first_name');
			$table->renameColumn('lastname', 'last_name');

			$table->dropColumn([
				'street',
				'nr',
				'zipcode',
				'city',
				'telephone',
				'fax',
				'email',
			]);
		});
	}

}
