/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

define(function (require) {
	'use strict';

	var Marionette = require('backbone.marionette');

	var AboutTemplate = require('../templates/rooms.html');
	var Radio = require('../radio');

	/**
	 * @class RoomsView
	 */
	var RoomsView = Marionette.ItemView.extend({
		template: AboutTemplate,

		templateHelpers: function () {
			var date = new Date();
			return {
				today: date.toISOString().substring(0, "1970-01-01".length)
			};
		},

		ui: {
			date: '#date',
			stays: '#stays',
			persons: '#persons',
			rooms: '#rooms',
			firstname: '#firstname',
			lastname: '#lastname',
			telephone: '#telephone',
			email: '#email',
			submit: '#submit-rooms',
			successAlert: '#alert-success',
			errorAlert: '#alert-error'
		},

		events: {
			'click @ui.submit': '_onSubmit'
		},

		_getBookingData: function () {
			return {
				date: this.ui.date.val(),
				stays: parseInt(this.ui.stays.val()),
				persons: parseInt(this.ui.persons.val()),
				rooms: parseInt(this.ui.rooms.val()),
				firstname: this.ui.firstname.val(),
				lastname: this.ui.lastname.val(),
				telephone: this.ui.telephone.val(),
				email: this.ui.email.val()
			};
		},

		_onSubmit: function () {
			this.$('input, select, button').prop('disabled', true);
			this.ui.successAlert.hide();
			this.ui.errorAlert.hide();

			this._sendRequest(this._getBookingData())
				.then(function () {
					this.ui.successAlert.show();
					console.info('booking request sent successfully');
				}.bind(this))
				.catch(function (e) {
					this.ui.errorAlert.show();
					console.error(e);
				}.bind(this))
				.then(function () {
					console.info('booking finished');
					this.$('input, select, button').prop('disabled', false);
				}.bind(this));

			return false;
		},

		_sendRequest: function (data) {
			return Radio.room.request('request:send', data);
		}
	});

	return RoomsView;
});
