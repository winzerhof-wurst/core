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
	var Marionette = require('backbone.marionette');

	var AppRouter = require('./approuter');
	var AppView = require('./views/appview');
	var CartController = require('./controllers/cartcontroller');
	var Pages = require('./pages');
	var Radio = require('./radio');
	var RouteController = require('./controllers/routecontroller');
	var TidbitService = require('./services/tidbitservice');
	var WineService = require('./services/wineservice');

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
		 * @type Pages
		 */
		_pages: undefined,

		/**
		 * @type RouteController
		 */
		_routeController: undefined,

		/**
		 * @returns {undefined}
		 */
		initialize: function() {
			this._pages = new Pages();
			this._view = new AppView(this._pages);
			this._routeController = new RouteController({
				appView: this._view,
				pages: this._pages
			});
			this._router = new AppRouter({
				controller: this._routeController
			});

			this._registerRequestReplyHandlers();

			this.on('start', this._onStart);
		},

		/**
		 * @returns {undefined}
		 */
		_onStart: function() {
			this._router.registerRoutes(this._pages);
			this._view.show();

			Backbone.history.start({
				pushState: true
			});
		},

		/**
		 * @returns {undefined}
		 */
		_registerRequestReplyHandlers: function() {
			var tidbitService = new TidbitService();
			var wineService = new WineService();

			Radio.tidbit.reply('entities', tidbitService.getAll);
			Radio.wine.reply('entities', wineService.getAll);
		}

	});

	return App;
});
