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

define(function(require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');

	var Cart = require('../collections/cart');
	var CartItem = require('../models/cartitem');
	var Radio = require('../radio');

	/**
	 * @class CartController
	 */
	var CartController = function(options) {
		this.initialize(options);
	};

	CartController.prototype = {
		_cart: null,
		initialize: function() {
			// Mix in Backbone.Event
			_.extend(this, Backbone.Events);

			this._cart = new Cart();

			this.listenTo(Radio.cart, 'wine:add', this._onAddWineToCart);
			Radio.cart.reply('submit:wines', this._onSubmitWines);
		},
		_onAddWineToCart: function(wine, quantity) {
			if (!quantity || quantity <= 0) {
				console.log('nice try…');
				return;
			}

			var existing = this._cart.findItem(wine);
			if (existing) {
				existing.set('quantity', existing.get('quantity') + quantity);
			} else {
				var cartItem = new CartItem({
					item: wine,
					quantity: quantity
				});
				this._cart.add(cartItem);
			}
		},
		_onSubmitWines: function(data) {
			var defer = $.Deferred();
			$.ajax('api/orders', {
				method: 'POST',
				data: data,
				success: function() {
					defer.resolve();
					console.info('conversion finished, revenue=' + data.revenue);
					_paq.push(['trackGoal', 3, data.revenue]);
				},
				error: function() {
					defer.reject();
				}
			});
			return defer.promise();
		}
	};

	return CartController;
});
