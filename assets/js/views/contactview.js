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

	var AboutTemplate = require('../templates/contact.html');

	/**
	 * @class ContactView
	 */
	var ContactView = Marionette.ItemView.extend({
		template: AboutTemplate,

		events: {
			'click a[href^="tel:"]': '_onClickTel',
			'click a[href^="mailto:"]': '_onClickEmail'
		},

		_onClickTel: function () {
			_paq.push(['trackEvent', 'contactform', 'called', this.href]);
		},

		_onClickEmail: function () {
			_paq.push(['trackEvent', 'contactform', 'mail sent', this.href]);
		}
	});

	return ContactView;
});
