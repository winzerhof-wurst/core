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
    var NewsView = require('views/newsview');
    var NotFoundView = require('views/notfoundview');

    /**
     * @class AppView
     */
    var AppView = Marionette.LayoutView.extend({
        /**
         * @type Pages
         */
        _pages: undefined,
        regions: {
            content: '#wiwu-content',
            navigation: '#navigation',
            navigationMobile: '#navigation-mobile'
        },
        initialize: function (options) {
            this._pages = options.pages;
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
        },
        showPage: function (name, options) {
            switch (name) {
                case 'news':
                    this.content.show(new NewsView());
                    break;
                default :
                    this.showNotFound();
                    console.log('unknown page ' + name);
            }
        },
        showNotFound: function () {
            this.content.show(new NotFoundView());
        }
    });

    return AppView;
});
