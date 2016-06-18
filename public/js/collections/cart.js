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

    var Backbone = require('backbone');

    var CartItem = require('models/cartitem');

    /**
     * @class Cart
     */
    var Cart = Backbone.Collection.extend({
        model: CartItem,
        findItem: function (item) {
            return this.findWhere({
                item: item
            });
        }
    });

    return Cart;
});
