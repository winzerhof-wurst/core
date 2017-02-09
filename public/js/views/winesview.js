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
	var Handlebars = require('handlebars');
	var Marionette = require('marionette');

	var aboutTemplate = require('text!templates/wines.html');
	var radio = require('radio');
	var WineList = require('views/winelist');

	/**
	 * @class WinesView
	 */
	var WinesView = Marionette.LayoutView.extend({
		template: Handlebars.compile(aboutTemplate),
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
		regions: {
			listWhite: '#white-wine-list',
			listRed: '#red-wine-list',
			listSpecialQuality: '#special-quality-wine-list',
			list1l: '#wine-1l-list'
		},
		onShow: function() {
			var loadingWines = radio.wine.request('entities');

			$.when(loadingWines).done(function(wines) {
				this.wines = wines;
				this.listWhite.show(new WineList({
					title: 'Weißweine',
					collection: wines,
					filter: function(wine) {
						return wine.get('type') === 'W';
					}
				}));
				this.listRed.show(new WineList({
					title: 'Rotweine',
					collection: wines,
					filter: function(wine) {
						return wine.get('type') === 'R';
					}
				}));
				this.listSpecialQuality.show(new WineList({
					title: 'Prädikatsweine',
					collection: wines,
					filter: function(wine) {
						return wine.get('type') === 'Q';
					}
				}));
				this.list1l.show(new WineList({
					title: 'Landweine - 1l',
					collection: wines,
					filter: function(wine) {
						return wine.get('type') === '1L';
					}
				}));
			}.bind(this));
		},
		_onSubmit: function() {
			var data = {
				firstname: this.ui.firstname.val(),
				lastname: this.ui.lastname.val(),
				street: this.ui.street.val(),
				nr: this.ui.nr.val(),
				zipcode: this.ui.zipcode.val(),
				city: this.ui.city.val(),
				email: this.ui.email.val(),
				comment: this.ui.comment.val(),
				wines: this.wines.toJSON()
			};
			// TODO: disable +6,+12 buttons too
			this.$('input,textarea').prop('disabled', true);
			this.ui.submit.button('loading');
			this.ui.successAlert.hide();
			this.ui.errorAlert.hide();

			var saving = radio.cart.request('submit:wines', data);

			var _this = this;
			saving.done(function() {
				_this.ui.successAlert.show();
			});
			saving.fail(function() {
				_this.ui.errorAlert.show();
				console.log(_this.ui.errorAlert);
			});
			saving.always(function() {
				_this.$('input,textarea').prop('disabled', false);
				_this.ui.submit.button('reset');
			});
		}
	});

	return WinesView;
});
