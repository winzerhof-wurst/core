/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

define(function(require) {
	'use strict';

	var $ = require('jquery');
	var Handlebars = require('handlebars');
	var Marionette = require('marionette');

	var aboutTemplate = require('text!templates/wines.html');
	var radio = require('radio');
	var WineList = require('views/winelist');

	/**
	 * @class WinesView
	 */
	var WinesView = Marionette.LayoutView.extend({
		template: Handlebars.compile(aboutTemplate),
		regions: {
			list: '#wine-list'
		},
		onShow: function() {
			var loadingWines = radio.wine.request('entities');

			var _this = this;
			$.when(loadingWines).done(function(wines) {
				_this.list.show(new WineList({
					collection: wines
				}));
			});
		}
	});

	return WinesView;
});
