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

	var Marionette = require('backbone.marionette');

	var NotFoundTemplate = require('../templates/notfound.html');

	var NotFoundView = Marionette.ItemView.extend({
		template: NotFoundTemplate
	});

	return NotFoundView;
});
