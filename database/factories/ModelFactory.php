<?php

use App\User;
use App\Wine;
use Faker\Generator;

$factory->define(User::class, function (Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(Wine::class, function (Generator $faker) {
    return [
        'name' => $faker->randomElement([
            'Grüner Veltliner',
            'Gelber Muskateller',
            'Riesling',
            'Sauvignon',
            'Rosé',
            'Merlot',
            'Zweigelt',
            'Blauburger',
            'Blauer Portugieser',
        ]),
        'year' => $faker->numberBetween(2014, 2015),
        'tax_rate' => 20,
        'price' => $faker->numberBetween(50, 100) / 10,
    ];
});
