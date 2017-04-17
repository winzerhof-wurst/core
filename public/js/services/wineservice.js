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
	var _ = require('underscore');

	var WineCollection = require('collections/winecollection');

	/**
	 * @class WineService
	 */
	var WineService = function(options) {
		this.initialize(options);
	};

	WineService.prototype = {

		/**
		 * @type WineCollection
		 */
		_collection: undefined,

		/**
		 * @returns {undefined}
		 */
		initialize: function() {
			this._collection = new WineCollection();

			_.bindAll(this, 'getAll');
		},

		getAll: function() {
			var defer = $.Deferred();

			this._collection.fetch({
				success: function(data) {
					defer.resolve(data);
				},
				error: function() {
					defer.reject();
				}
			});

			return defer.promise();
		}

	};

	return WineService;
});
