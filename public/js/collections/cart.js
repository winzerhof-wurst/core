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

    var Item = require('models/item');

    /**
     * @class Cart
     */
    var Cart = Backbone.Collection.extend({
        model: Item,
    });

    return Cart;
});
