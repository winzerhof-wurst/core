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

	var _ = require('underscore');
	var Backbone = require('backbone');

	var Radio = require('radio');

	/**
	 * @class RouteController
	 */
	var RouteController = function(options) {
		this.initialize(options);
	};

	RouteController.prototype = {
		/**
		 * @type AppView
		 */
		_appView: undefined,
		/**
		 * @type Pages
		 */
		_pages: undefined,
		initialize: function(options) {
			this._appView = options.appView;
			this._pages = options.pages;

			Radio.navigation.on('navigate', _.bind(this._onNavigate, this));
		},
		default: function() {
			this._appView.showPage('default');
		},
		notFound: function() {
			this._appView.showPage('notfound');
		},
		news: function() {
			this._appView.showPage('news');
		},
		about: function() {
			this._appView.showPage('about');
		},
		contact: function() {
			this._appView.showPage('contact');
		},
		rooms: function() {
			this._appView.showPage('rooms');
		},
		tidbits: function() {
			this._appView.showPage('tidbits');
		},
		wines: function() {
			this._appView.showPage('wines');
		},
		_onNavigate: function(pageId) {
			this._appView.showPage(pageId);
			var page = this._pages.get(pageId);
			if (page) {
				Backbone.history.navigate(page.get('url'));
			}
		}
	};

	return RouteController;
});
