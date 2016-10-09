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

	var Backbone = require('backbone');
	var Marionette = require('marionette');

	var Radio = require('radio');

	/**
	 * @class App
	 */
	var App = Marionette.Application.extend({
		/**
		 * @type AppView
		 */
		_view: undefined,
		/**
		 * @type AppRouter
		 */
		_router: undefined,
		/**
		 * @type WineService
		 */
		_wineService: undefined,
		initialize: function(options) {
			this._view = options.view;
			this._router = options.router;
			this._wineService = options.wineService;

			this._registerRequestReplyHandlers();

			this.on('start', this._onStart);
		},
		_onStart: function() {
			this._view.show();

			Backbone.history.start();
		},
		_registerRequestReplyHandlers: function() {
			Radio.wine.reply('entities', this._wineService.getAll);
		}
	});

	return App;
});
