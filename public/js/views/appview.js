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

    var $ = require('jquery');
    var Marionette = require('marionette');

    var AboutView = require('views/aboutview');
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
        showPage: function (id) {
            $('.nav li').removeClass('active');

            // Update title
            var page = this._pages.get(id);
            if (page) {
                this.updateTitle(page.get('name'));
            } else {
                this.updateTitle();
            }

            // Show page content
            switch (id) {
                case 'news':
                    this.content.show(new NewsView());
                    this._setPageActive(id);
                    break;
                case 'about':
                    this.content.show(new AboutView());
                    this._setPageActive(id);
                    break;
                default:
                    this.showNotFound();
                    console.warn('unknown page ' + id);
            }
        },
        showNotFound: function () {
            this.content.show(new NotFoundView());
        },
        _setPageActive: function (id) {
            $('.nav li[data-id="' + id + '"').addClass('active');
        }
    });

    return AppView;
});
