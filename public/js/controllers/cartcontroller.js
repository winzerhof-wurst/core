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

    var _ = require('underscore');
    var Backbone = require('backbone');

    var CartItem = require('models/cartitem');
    var Item = require('models/item');
    var Radio = require('radio');
    var Wine = require('models/wine');

    /**
     * @class CartController
     */
    var CartController = function (options) {
        this.initialize(options);
    }

    CartController.prototype = {
        _cart: null,
        initialize: function (options) {
            // Mix in Backbone.Event
            _.extend(this, Backbone.Events);

            this._cart = options.cart;

            this.listenTo(Radio.cart, 'wine:add', this._onAddWineToCart);
        },
        _onAddWineToCart: function (wine, quantity) {
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
        }
    };

    return CartController;
});
