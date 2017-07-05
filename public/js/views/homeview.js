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

	var Handlebars = require('handlebars');
	var Marionette = require('marionette');

	var Radio = require('radio');

	var HomeTemplate = require('text!templates/home.html');

	var HomeView = Marionette.ItemView.extend({
		template: Handlebars.compile(HomeTemplate),

		events: {
			'click #home-navigation a': '_onNavClick'
		},

		_onNavClick: function(event) {
			event.preventDefault();
			var $target = $(event.target);
			var pageId = $target.data('id');
			if (!pageId) {
				return;
			}
			Radio.navigation.trigger('navigate', pageId);
		}
	});

	return HomeView;
});
