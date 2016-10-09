/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

require.config({
	paths: {
		backbone: '../vendor/backbone/backbone-min',
		'backbone.radio': '../vendor/backbone.radio/build/backbone.radio.min',
		bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
		handlebars: '../vendor/handlebars/handlebars.amd.min',
		jquery: '../vendor/jquery/dist/jquery.min',
		marionette: '../vendor/backbone.marionette/lib/backbone.marionette.min',
		text: '../vendor/text/text',
		underscore: '../vendor/underscore/underscore-min'
	},
	packages: [
		{name: 'wire', location: '../vendor/wire', main: 'wire'},
		{name: 'when', location: '../vendor/when', main: 'when'},
		{name: 'meld', location: '../vendor/meld', main: 'meld'}
	]
});

require([
	'jquery',
	'bootstrap',
	'wire!main'
]);