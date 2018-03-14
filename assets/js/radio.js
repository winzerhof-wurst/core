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

	var _ = require('underscore');
	var Radio = require('backbone.radio');

	var channels = [];
	var channelNames = [
		'cart',
		'navigation',
		'room',
		'tidbit',
		'wine'
	];

	_.each(channelNames, function(name) {
		channels[name] = Radio.channel(name);
	});

	return channels;
});
