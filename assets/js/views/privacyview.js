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

	var PrivacyTemplate = require('../templates/privacy.html');

	/**
	 * @class PrivacyView
	 */
	var PrivacyView = Marionette.ItemView.extend({
		template: PrivacyTemplate,
	});

	return PrivacyView;
});
