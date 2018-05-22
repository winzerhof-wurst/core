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
	var Marionette = require('backbone.marionette');

	require('bootstrap-loader');

	var AboutView = require('./aboutview');
	var ContactView = require('./contactview');
	var ContentView = require('./contentview');
	var HomeView = require('./homeview');
	var ImprintView = require('./imprintview');
	var LoadingView = require('./loadingview');
	var NewsView = require('./newsview');
	var NotFoundView = require('./notfoundview');
	var PrivacyView = require('./privacyview');
	var RoomsView = require('./roomsview');
	var TidbitsView = require('./tidbitsview');
	var WinesView = require('./winesview');
	var Radio = require('../radio');

	/**
	 * @class AppView
	 */
	var AppView = Marionette.LayoutView.extend({

		el: '#app',

		/**
		 * @type {Pages}
		 */
		_pages: undefined,

		_overlay: undefined,

		_contentView: undefined,

		regions: {
			content: '#content',
			navigation: '#navigation',
			navigationMobile: '#navigation-mobile'
		},

		initialize: function (pages) {
			this._pages = pages;

			this._overlay = $('#overlay');
			this._home = $('#home');
		},

		show: function () {
			this.content.show(new LoadingView());
			this._overlay.fadeOut();
		},

		updateTitleDescription: function (title, description) {
			if (title) {
				document.title = title + ' – Winzerhof Wurst';
			} else {
				document.title = 'Winzerhof Wurst';
			}
			if (description) {
				$('meta[name=description]').attr('content', description);
			} else {
				$('meta[name=description]').attr('content', 'Unser Familienbetrieb befindet sich in Schrattenthal, der kleinsten Weinstadt im Weinviertel. Der Weinbau hat bei uns Tradition, und unsere Wurzeln reichen bis in das Jahr 1836 zurück.');
			}
		},

		showPage: function (id) {
			// Update title and description
			var page = this._pages.get(id);
			if (page) {
				this.updateTitleDescription(page.get('name'), page.get('description'));
			} else {
				this.updateTitleDescription();
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
				case 'imprint':
					this._showContentView(new ImprintView());
					break;
				case 'privacy':
					this._showContentView(new PrivacyView());
					break;
				case 'notfound':
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
				$('.nav li[data-id="' + id + '"]').addClass('active');
			}
		}

	});

	return AppView;
});
