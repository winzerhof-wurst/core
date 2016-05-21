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
            module: 'approuter',
            args: [
                {
                    controller: {$ref: 'RouteController'}
                }
            ]
        }
    },
    RouteController: {
        create: {
            module: 'controller/routecontroller',
            args: [
                {
                    appView: {$ref: 'AppView'}
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
                    loadingView: {$ref: 'LoadingView'},
                    newsView: {$ref: 'NewsView'}
                }
            ]
        }
    },
    NewsView: {
        create: {
            module: 'views/newsview'
        }
    },
    LoadingView: {
        create: {
            module: 'views/loadingview'
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
