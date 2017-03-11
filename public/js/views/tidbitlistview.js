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

	var Marionette = require('marionette');

	var TidbitListItemView = require('views/tidbitlistitemview');

	var TidbitListView = Marionette.CollectionView.extend({
		/**
		 * @type {TidbitListItemView}
		 */
		childView: TidbitListItemView
	});

	return TidbitListView;
});
