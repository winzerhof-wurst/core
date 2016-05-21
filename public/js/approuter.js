/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    /**
     * @class Router
     */
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'default',
            'aktuelles': 'news',
            'betrieb': 'about',
            'kontakt': 'contact'
        }
    });

    return Router;
});
