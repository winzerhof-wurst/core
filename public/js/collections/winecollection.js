/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016-2017
 */

define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var Wine = require('models/wine');

	/**
	 * @class WineController
	 */
	var WineCollection = Backbone.Collection.extend({

		/**
		 * @type {Wine}
		 */
		model: Wine,

		/**
		 * @type {string}
		 */
		url: 'api/wines',

		/**
		 * @returns {undefined}
		 */
		initialize: function() {
			this.on('clear', this._onClear);
		},

		/**
		 * @private
		 * @returns {undefined}
		 */
		_onClear: function() {
			this.forEach(function(wine) {
				wine.set('quantity', 0);
			});
		}

	});

	return WineCollection;
});
