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
     * @class AppView
     */
    var AppView = Marionette.LayoutView.extend({
        /**
         * @type LoadingView
         */
        _loadingView: undefined,
        /**
         * @type NewsView
         */
        _newsView: undefined,
        regions: {
            content: '#wiwu-content'
        },
        initialize: function (options) {
            this._loadingView = options.loadingView;
            this._newsView = options.newsView;
        },
        show: function () {
            this.content.show(this._loadingView);
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
                    this.content.show(this._newsView);
                    break;
                default :
                    this.content.show(this._loadingView);
                    console.log('unknown page ' + name);
            }
        }
    });

    return AppView;
});
