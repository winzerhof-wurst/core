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
		backbone: '../vendor/backbone/backbone',
		'backbone.radio': '../vendor/backbone.radio/build/backbone.radio.min',
		bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
		handlebars: '../vendor/handlebars/handlebars.amd.min',
		marionette: '../vendor/backbone.marionette/lib/backbone.marionette',
		text: '../vendor/text/text',
		underscore: '../vendor/underscore/underscore-min'
	}
});

require([
	'init'
]);