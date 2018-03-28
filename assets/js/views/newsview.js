/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2018
 */

define(function (require) {
	'use strict';

	var Marionette = require('backbone.marionette');

	var NewsTemplate = require('../templates/news.html');

	/**
	 * @class NewsView
	 */
	var NewsView = Marionette.CompositeView.extend({
		template: NewsTemplate,

		templateHelpers: function () {
			var marketDates = [
				new Date(2018, 0, 20),
				new Date(2018, 1, 17),
				new Date(2018, 2, 17),
				new Date(2018, 3, 21),
				new Date(2018, 4, 19),
				new Date(2018, 5, 16),
				new Date(2018, 6, 21),
				new Date(2018, 7, 18),
				new Date(2018, 8, 15),
				new Date(2018, 9, 20),
				new Date(2018, 10, 17),
				new Date(2018, 11, 15)
			];
			var today = new Date();

			return {
				marketDates: marketDates.filter(function (date) {
					return date.getFullYear() >= today.getFullYear()
						&& date.getMonth() >= today.getMonth();
				})
			};
		}
	});

	return NewsView;
});
