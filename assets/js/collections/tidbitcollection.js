/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2017
 */

define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var Tidbit = require('../models/tidbit');

	/**
	 * @class TidbitCollection
	 */
	var TidbitCollection = Backbone.Collection.extend({

		/**
		 * @type {Tidbit}
		 */
		model: Tidbit,

		/**
		 * @type {string}
		 */
		url: 'api/tidbits',

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
			this.forEach(function(tidbit) {
				tidbit.set('quantity', 0);
			});
		}

	});

	return TidbitCollection;
});
