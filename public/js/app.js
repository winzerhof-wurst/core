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

	var Backbone = require('backbone');
	var Marionette = require('marionette');

	var CartController = require('controllers/cartcontroller');
	var Radio = require('radio');
	var TidbitService = require('services/tidbitservice');
	var WineService = require('services/wineservice');

	var cartController = new CartController();

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
		 * @param {Object} options
		 * @returns {undefined}
		 */
		initialize: function(options) {
			this._view = options.view;
			this._router = options.router;

			this._registerRequestReplyHandlers();

			this.on('start', this._onStart);
		},

		/**
		 * @returns {undefined}
		 */
		_onStart: function() {
			this._view.show();

			Backbone.history.start();
		},

		/**
		 * @returns {undefined}
		 */
		_registerRequestReplyHandlers: function() {
			Radio.tidbit.reply('entities', TidbitService.getAll);
			Radio.wine.reply('entities', WineService.getAll);
		}
	});

	return App;
});
