/* global _paq */

/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2017
 */

define(function (require) {
	'use strict';

	var _ = require('underscore');
	var Marionette = require('backbone.marionette');

	var tidbitTemplate = require('../templates/tidbitlistitem.html');

	var TidibitListItemView = Marionette.ItemView.extend({

		className: 'item',

		template: tidbitTemplate,

		ui: {
			add1: '.add-to-cart button.add-1',
			quantityInput: '.add-to-cart input'
		},

		events: {
			'change @ui.quantityInput': '_onQuantityChange',
			'keyup @ui.quantityInput': '_onQuantityChange',
			'keydown @ui.quantityInput': '_onQuantityChange',
			'paste @ui.quantityInput': '_onQuantityChange',
			'click @ui.add1': '_onAdd1'
		},

		modelEvents: {
			'change': '_onModelQuantityChanged'
		},

		/**
		 * @returns {undefined}
		 */
		_onAdd1: function () {
			this.model.set('quantity', this._getQuantity() + 1);
		},

		/**
		 * @returns {undefined}
		 */
		_onModelQuantityChanged: function () {
			this.ui.quantityInput.val(this.model.get('quantity'));
			_paq.push(['trackGoal', 6]);
		},

		/**
		 * @returns {undefined}
		 */
		_onQuantityChange: function () {
			// Strip non-numeric values
			var quantity = this._getQuantity();
			this.model.set('quantity', quantity);
			this.ui.quantityInput.val(this.model.get('quantity'));
		},

		/**
		 * @private
		 * @returns {Number}
		 */
		_getQuantity: function () {
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

	return TidibitListItemView;
});
