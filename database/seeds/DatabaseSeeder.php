<?php

use App\Wine;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        factory(Wine::class, 15)->create();
    }

}
