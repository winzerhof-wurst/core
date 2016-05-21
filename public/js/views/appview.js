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
    var ContactView = require('views/contactview');
    var ContentView = require('views/contentview');
    var HomeView = require('views/homeview');
    var LoadingView = require('views/loadingview');
    var NewsView = require('views/newsview');
    var NotFoundView = require('views/notfoundview');
    var RoomsView = require('views/roomsview');
    var TidbitsView = require('views/tidbitsview');
    var WinesView = require('views/winesview');

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
                    this._showContentView(new NewsView());
                    break;
                case 'about':
                    this._showContentView(new AboutView());
                    break;
                case 'rooms':
                    this._showContentView(new RoomsView());
                    break;
                case 'wines':
                    this._showContentView(new WinesView());
                    break;
                case 'tidbits':
                    this._showContentView(new TidbitsView());
                    break;
                case 'contact':
                    this._showContentView(new ContactView());
                    break;
                default:
                    console.warn('unknown page ' + id);
                    this._showContentView(new NotFoundView());
            }

            this._setPageActive(id);
        },
        _showHome: function () {
            this.content.show(new HomeView());
        },
        _showContentView: function (view) {
            this._showContent();
            this.content.currentView.showContent(view);
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
