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

	var Marionette = require('marionette');

	/**
	 * @class Router
	 */
	var Router = Marionette.AppRouter.extend({
		appRoutes: {},
		initialize: function(options) {
			var _this = this;
			_this.appRoute('*page', 'notFound');
			options.pages.forEach(function(page) {
				_this.appRoute(page.get('url'), page.get('id'));
			});
		}
	});

	return Router;
});
