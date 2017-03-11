/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016-2017
 */

define(function (require) {
	'use strict';

	var Marionette = require('marionette');

	var radio = require('radio');

	/**
	 * @class WinesView
	 */
	var WinesView = Marionette.LayoutView.extend({

		ui: {
			firstname: '#firstname',
			lastname: '#lastname',
			street: '#street',
			nr: '#nr',
			zipcode: '#zipcode',
			city: '#city',
			telephone: '#telephone',
			fax: '#fax',
			email: '#email',
			comment: '#comment',
			submit: '#submit-wines',
			successAlert: '#alert-success',
			errorAlert: '#alert-error'
		},

		events: {
			'click @ui.submit': '_onSubmit'
		},

		/**
		 * @protected
		 * @returns {undefined}
		 */
		_loadData: function () {
			throw new Error('not implemented');
		},

		/**
		 * @returns {undefined}
		 */
		onShow: function () {
			this._loadData();
		},

		/**
		 * @returns {undefined}
		 */
		_resetForm: function () {
			// Can be overridden
		},

		/**
		 * @protected
		 * @argument {Object} data
		 * @returns {undefined}
		 */
		_onBeforeSubmit: function (data) {
			// Can be overridden
		},

		/**
		 * @returns {undefined}
		 */
		_onSubmit: function () {
			var data = {
				firstname: this.ui.firstname.val(),
				lastname: this.ui.lastname.val(),
				street: this.ui.street.val(),
				nr: this.ui.nr.val(),
				zipcode: this.ui.zipcode.val(),
				city: this.ui.city.val(),
				email: this.ui.email.val(),
				comment: this.ui.comment.val()
			};
			this._onBeforeSubmit(data);

			this.$('input,textarea,.add-6,.add-12').prop('disabled', true);
			this.ui.submit.button('loading');
			this.ui.successAlert.hide();
			this.ui.errorAlert.hide();

			var saving = radio.cart.request('submit:wines', data);

			saving.done(function () {
				this._resetForm();
				this.ui.successAlert.show();
			}.bind(this));
			saving.fail(function () {
				this.ui.errorAlert.show();
			}.bind(this));
			saving.always(function () {
				this.$('input,textarea,.add-6,.add-12').prop('disabled', false);
				this.ui.submit.button('reset');
			}.bind(this));
		}

	});

	return WinesView;
});
