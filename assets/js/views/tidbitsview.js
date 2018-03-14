/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016-2017
 */

define(function (require) {
	'use strict';

	var $ = require('jquery');

	var ShopView = require('./shopview');
	var TidbitListView = require('./tidbitlistview');
	var radio = require('../radio');
	var tidbitsTemplate = require('../templates/tidbits.html');

	/**
	 * @class TidbitsView
	 */
	var TidbitsView = ShopView.extend({

		template: tidbitsTemplate,

		regions: {
			tidbits: '#tidbits'
		},

		/**
		 * @type {TidbitCollection}
		 */
		_tidbits: undefined,

		/**
		 * @override
		 * @returns {undefined}
		 */
		_loadData: function () {
			var loadingTidbits = radio.tidbit.request('entities');

			$.when(loadingTidbits).done(function (tidbits) {
				this._tidbits = tidbits;

				this.tidbits.show(new TidbitListView({
					collection: tidbits
				}));
			}.bind(this));
			$.when(loadingTidbits).fail(function () {
				console.error('could not load tidbits');
			});
		},

		/**
		 * @override
		 * @param {Object} data
		 * @returns {undefined}
		 */
		_onBeforeSubmit: function (data) {
			data.tidbits = this._tidbits.toJSON();
			data.revenue = this._tidbits.reduce(function(memo, tidbit) {
				return memo + parseFloat(tidbit.get('price'));
			}, 0);
		},

		/**
		 * @override
		 * @returns {undefined}
		 */
		_resetForm: function () {
			this._tidbits.trigger('clear');
		}

	});

	return TidbitsView;
});
