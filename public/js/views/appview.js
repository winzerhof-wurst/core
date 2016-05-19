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
    var LoadingView = require('views/loadingview');

    var AppView = Marionette.LayoutView.extend({
        regions: {
            content: '#wiwu-content'
        },
        initialize: function () {
            console.log('App view initialized');
        },
        show: function () {
            this.content.show(new LoadingView());
        },
        updateTitle: function (title) {
            if (title) {
                document.title = title + ' – Winzerhof Wurst';
            } else {
                document.title = 'Winzerhof Wurst';
            }
        }
    });

    return AppView;
});
