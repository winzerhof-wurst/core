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

    var Backbone = require('backbone');
    var Marionette = require('marionette');

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
        initialize: function (options) {
            this._view = options.view;
            this._router = options.router;
            console.log(this._view);
            console.log(this._router);
            this.on('start', this._onStart);
        },
        _onStart: function () {
            console.log('WiWu started');

            this._view.show();
            this._view.updateTitle('Test');

            Backbone.history.start();
        }
    });

    return App;
});
