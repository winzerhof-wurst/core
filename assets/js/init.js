/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2017
 */

define(function(require) {
	'use strict';

	var $ = require('jquery');
	var App = require('./app');

	$(function() {
		$.ajaxSetup({
			headers: {'X-CSRF-TOKEN': $('#csrf-token').val()}
		});
	});

	var app = new App();
	app.start();
});


