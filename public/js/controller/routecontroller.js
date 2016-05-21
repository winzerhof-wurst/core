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
        _appView: undefined,
        initialize: function (options) {
            this._appView = options.appView;
        },
        default: function () {
            this._appView.showPage('default');
        },
        notFound: function () {
            this._appView.showNotFound();
        },
        news: function () {
            this._appView.showPage('news');
        },
        about: function () {
            this._appView.showPage('about');
        },
        contact: function () {
            this._appView.showPage('contact');
        },
        rooms: function () {
            this._appView.showPage('rooms');
        },
        tidbits: function () {
            this._appView.showPage('tidbits');
        },
        wines: function () {
            this._appView.showPage('wines');
        }
    };

    return RouteController;
});
