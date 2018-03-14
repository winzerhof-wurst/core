/* global Promise */

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

	var $ = require('jquery');
	var _ = require('underscore');

	/**
	 * @class RoomService
	 */
	var RoomService = function (options) {
		this.initialize(options);
	};

	RoomService.prototype = {

		initialize: function () {

		},

		sendRoomRequest: function (data) {
			return Promise.resolve($.post('/api/rooms/book', data));
		}

	};

	return RoomService;
});

