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
    var ContentView = require('views/contentview');
    var HomeView = require('views/homeview');
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
        _overlay: undefined,
        _contentView: undefined,
        regions: {
            content: '#content',
            navigation: '#navigation',
            navigationMobile: '#navigation-mobile'
        },
        initialize: function (options) {
            this._pages = options.pages;
            this._overlay = $('#overlay');
            this._home = $('#home');
        },
        show: function () {
            this.content.show(new LoadingView());
            this._overlay.fadeOut();
        },
        updateTitle: function (title) {
            if (title) {
                document.title = title + ' – Winzerhof Wurst';
            } else {
                document.title = 'Winzerhof Wurst';
            }
        },
        showPage: function (id) {
            this._setPageActive();

            // Update title
            var page = this._pages.get(id);
            if (page) {
                this.updateTitle(page.get('name'));
            } else {
                this.updateTitle();
            }

            // Show page content
            switch (id) {
                case 'default':
                    this._showHome();
                    break;
                case 'news':
                    this._showContent();
                    this.content.currentView.showContent(new NewsView());
                    this._setPageActive(id);
                    break;
                case 'about':
                    this._showContent();
                    this.content.currentView.showContent(new AboutView());
                    this._setPageActive(id);
                    break;
                default:
                    this._showContent();
                    this.showNotFound();
                    console.warn('unknown page ' + id);
            }
        },
        showNotFound: function () {
            this.content.currentView.showContent(new NotFoundView());
        },
        _showHome: function () {
            this.content.show(new HomeView());
        },
        _showContent: function () {
            this.content.show(new ContentView());
        },
        _setPageActive: function (id) {
            $('.nav li').removeClass('active');
            if (id) {
                $('.nav li[data-id="' + id + '"').addClass('active');
            }
        }
    });

    return AppView;
});
