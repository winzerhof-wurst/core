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
    var AppView = require('views/appview');

    var App = Marionette.Application.extend({
        view: undefined,
        initialize: function () {
            this.on('start', this._onStart);
        },
        _onStart: function () {
            console.log('WiWu started');

            this.view = new AppView({
                el: '#app'
            });
            this.view.show();
            this.view.updateTitle('Test');
        }
    });

    return App;
});
