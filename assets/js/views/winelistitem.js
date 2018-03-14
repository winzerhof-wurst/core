/* global _paq */

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
	var Marionette = require('backbone.marionette');

	var WineListItemTemplate = require('../templates/winelistitem.html');

	var WineListItem = Marionette.ItemView.extend({
		className: 'item',
		template: WineListItemTemplate,
		ui: {
			add6BottlesBtn: '.add-to-cart button.add-6',
			add12BottlesBtn: '.add-to-cart button.add-12',
			quantityInput: '.add-to-cart input'
		},
		events: {
			'change @ui.quantityInput': '_onQuantityChange',
			'keyup @ui.quantityInput': '_onQuantityChange',
			'keydown @ui.quantityInput': '_onQuantityChange',
			'paste @ui.quantityInput': '_onQuantityChange',
			'click @ui.add6BottlesBtn': '_onAdd6Bottles',
			'click @ui.add12BottlesBtn': '_onAdd12Bottles'
		},
		modelEvents: {
			'change': '_onModelQuantityChanged'
		},
		_onModelQuantityChanged: function() {
			this.ui.quantityInput.val(this.model.get('quantity'));
			_paq.push(['trackGoal', 5]);
		},
		_onQuantityChange: function(e) {
			// Strip non-numeric values
			var quantity = this._getQuantity();
			this.model.set('quantity', quantity);
			this.ui.quantityInput.val(this.model.get('quantity'));
		},
		_onAdd6Bottles: function() {
			this.model.set('quantity', this._getQuantity() + 6);
		},
		_onAdd12Bottles: function() {
			this.model.set('quantity', this._getQuantity() + 12);
		},
		/**
		 * @private
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
		 * @private
		 * @argument {String} val
		 * @returns {Number} 
		 */
		_sanitizeQuantity: function(val) {
			return val.replace(/\D/g, '');
		}
	});

	return WineListItem;
});
