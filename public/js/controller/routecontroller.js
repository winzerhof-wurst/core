/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

define(function () {
    'use strict';

    /**
     * @class RouteController
     *
     * @param {type} options
     * @returns {routecontroller_L11.RouteController}
     */
    var RouteController = function (options) {
        this.initialize(options);
    };

    RouteController.prototype = {
        /**
         * @type AppView
         */
        appView: undefined,
        initialize: function (options) {
            this.appView = options.appView;
        },
        default: function () {
            this.appView.showPage('default');
        },
        news: function () {
            this.appView.showPage('news');
        },
        about: function () {
            this.appView.showPage('about');
        },
        contact: function () {
            this.appView.showPage('contact');
        }
    };

    return RouteController;
});
