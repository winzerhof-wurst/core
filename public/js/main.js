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
					router: {$ref: 'AppRouter'},
					wineService: {$ref: 'WineService'}
				}
			]
		},
		ready: {
			start: {}
		}
	},
	AppRouter: {
		create: {
			module: 'approuter',
			args: [
				{
					controller: {$ref: 'RouteController'},
					pages: {$ref: 'Pages'}
				}
			]
		}
	},
	Pages: {
		create: {
			module: 'pages'
		}
	},
	CartController: {
		create: {
			module: 'controllers/cartcontroller',
			args: [
				{
					cart: {$ref: 'Cart'}
				}
			]
		}
	},
	RouteController: {
		create: {
			module: 'controllers/routecontroller',
			args: [
				{
					appView: {$ref: 'AppView'},
					pages: {$ref: 'Pages'}
				}
			]
		}
	},
	/**
	 * Collections
	 */
	Cart: {
		create: {
			module: 'collections/cart'
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
			module: 'views/appview',
			args: [
				{
					el: '#app',
					pages: {$ref: 'Pages'}
				}
			]
		}
	},
	/**
	 * Services
	 */
	WineService: {
		create: {
			module: 'services/wineservice',
			args: [
				{
					collection: {$ref: 'WineCollection'}
				}
			]
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
