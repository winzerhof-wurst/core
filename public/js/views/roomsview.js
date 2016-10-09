/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

define(function(require) {
	'use strict';

	var Handlebars = require('handlebars');
	var Marionette = require('marionette');

	var AboutTemplate = require('text!templates/rooms.html');

	/**
	 * @class RoomsView
	 */
	var RoomsView = Marionette.ItemView.extend({
		template: Handlebars.compile(AboutTemplate)
	});

	return RoomsView;
});
