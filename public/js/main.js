/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

define({
	App: {
		create: {
			module: 'app',
			args: [
				{
					view: {$ref: 'AppView'},
					router: {$ref: 'AppRouter'}
				}
			]
		},
		ready: {
			start: {}
		}
	},
	AppRouter: {
		create: {
			module: 'approuter'
		}
	},
	RouteController: {
		create: {
			module: 'controllers/routecontroller',
			args: [
				{
					appView: {$ref: 'AppView'}
				}
			]
		}
	},
	/**
	 * Collections
	 */
	TidbitCollection: {
		create: {
			module: 'collections/tidbitcollection',
			args: [
				{
					url: 'api/tidbits'
				}
			]
		}
	},
	WineCollection: {
		create: {
			module: 'collections/winecollection',
			args: [
				{
					url: 'api/wines'
				}
			]
		}
	},
	/**
	 * Views
	 */
	AppView: {
		create: {
			module: 'views/appview'
		}
	},
	/**
	 * Plugins
	 */
	plugins: [
		{
			module: 'wire/debug',
			trace: false
		}
	]
});
