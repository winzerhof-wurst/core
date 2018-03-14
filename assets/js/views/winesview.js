/* global _paq */

/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2017
 */

define(function (require) {
	'use strict';

	var $ = require('jquery');

	var ShopView = require('./shopview');
	var WineList = require('./winelist');
	var radio = require('../radio');
	var winesTemplate = require('../templates/wines.html');

	/**
	 * @class WinesView
	 */
	var WinesView = ShopView.extend({

		template: winesTemplate,

		regions: {
			listWhite: '#white-wine-list',
			listRed: '#red-wine-list',
			listSpecialQuality: '#special-quality-wine-list',
			list1l: '#wine-1l-list'
		},

		/**
		 * @type {WineCollection}
		 */
		_wines: undefined,

		/**
		 * @override
		 * @returns {undefined}
		 */
		_loadData: function () {
			var loadingWines = radio.wine.request('entities');

			$.when(loadingWines).done(function (wines) {
				this._wines = wines;
				this.listWhite.show(new WineList({
					collection: wines,
					filter: function (wine) {
						return wine.get('type') === 'W';
					}
				}));
				this.listRed.show(new WineList({
					collection: wines,
					filter: function (wine) {
						return wine.get('type') === 'R';
					}
				}));
				this.listSpecialQuality.show(new WineList({
					collection: wines,
					filter: function (wine) {
						return wine.get('type') === 'Q';
					}
				}));
				this.list1l.show(new WineList({
					collection: wines,
					filter: function (wine) {
						return wine.get('type') === '1L';
					}
				}));
			}.bind(this));
		},

		/**
		 * @override
		 * @param {Object} data
		 * @returns {undefined}
		 */
		_onBeforeSubmit: function (data) {
			data.wines = this._wines.toJSON();
			data.revenue = this._wines.reduce(function(memo, wine) {
				_paq.push(['addEcommerceItem',
					'W' + wine.get('id'),
					wine.get('name'),
					'Wine',
					wine.get('price'),
					wine.get('quantity')
				]);
				return memo + parseFloat(wine.get('price'));
			}, 0);
		},

		/**
		 * @override
		 * @returns {undefined}
		 */
		_resetForm: function () {
			this._wines.trigger('clear');
		}

	});

	return WinesView;
});
