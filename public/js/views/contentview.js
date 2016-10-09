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

	var ContentTemplate = require('text!templates/content.html');
	var Radio = require('radio');

	/**
	 * @class ContentView
	 */
	var ContentView = Marionette.LayoutView.extend({
		template: Handlebars.compile(ContentTemplate),
		regions: {
			content: '#wiwu-content'
		},
		events: {
			'click .nav li a': '_onNavClick'
		},
		showContent: function(view) {
			this.content.show(view);
			window.scrollTo(0, 0);
		},
		_onNavClick: function(event) {
			event.preventDefault();
			var $target = $(event.target);
			var pageId = $target.closest('li').data('id');
			if (!pageId) {
				return;
			}
			Radio.navigation.trigger('navigate', pageId);
		}
	});

	return ContentView;
});
