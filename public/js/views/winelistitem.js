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
	var Handlebars = require('handlebars');
	var Marionette = require('marionette');

	var WineListItemTemplate = require('text!templates/winelistitem.html');

	var WineListItem = Marionette.ItemView.extend({
		className: 'item',
		template: Handlebars.compile(WineListItemTemplate),
		ui: {
			add6BottlesBtn: '.add-to-cart button.add-6',
			add12BottlesBtn: '.add-to-cart button.add-12',
			quantityInput: '.add-to-cart input'
		},
		events: {
			'change @ui.quantityInput': '_onQuantityChange',
			'keyup @ui.quantityInput': '_onQuantityChange',
			'keydown @ui.quantityInput': '_onQuantityChange',
			'focus @ui.quantityInput': '_onQuantityChange',
			'paste @ui.quantityInput': '_onQuantityChange',
			'click @ui.add6BottlesBtn': '_onAdd6Bottles',
			'click @ui.add12BottlesBtn': '_onAdd12Bottles'
		},
		_onQuantityChange: function(e) {
			// Strip non-numeric values
			var quantity = this._getQuantity();
			this.ui.quantityInput.val(quantity);
		},
		_onAdd6Bottles: function(e) {
			this._setQuantity(this._getQuantity() + 6);
		},
		_onAdd12Bottles: function(e) {
			this._setQuantity(this._getQuantity() + 12);
		},
		/**
		 * @returns {Number}
		 */
		_getQuantity: function() {
			var quantity = parseInt(this._sanitizeQuantity(this.ui.quantityInput.val()), 10);
			if (_.isNaN(quantity)) {
				return 0;
			}
			return quantity;
		},
		/**
		 * @param {Number} quantity
		 */
		_setQuantity: function(quantity) {
			this.ui.quantityInput.val(quantity);
		},
		_sanitizeQuantity(val) {
			return val.replace(/\D/g, '');
		}
	});

	return WineListItem;
});
