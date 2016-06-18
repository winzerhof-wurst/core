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

    var Handlebars = require('handlebars');
    var Marionette = require('marionette');

    var Radio = require('radio');
    var WineListItemTemplate = require('text!templates/winelistitem.html');

    var WineListItem = Marionette.ItemView.extend({
        className: 'item',
        template: Handlebars.compile(WineListItemTemplate),
        ui: {
            addToCartBtn: '.add-to-cart button',
            quantityInput: '.add-to-cart input'
        },
        events: {
            'change @ui.quantityInput': '_onQuantityChange',
            'keyup @ui.quantityInput': '_onQuantityChange',
            'keydown @ui.quantityInput': '_onQuantityChange',
            'focus @ui.quantityInput': '_onQuantityChange',
            'paste @ui.quantityInput': '_onQuantityChange',
            'click @ui.addToCartBtn': '_onAddToCart'
        },
        _onQuantityChange: function(e) {
            // Strip non-numeric values
            this.ui.quantityInput.val(this.ui.quantityInput.val().replace(/\D/g, ''));
        },
        _onAddToCart: function(e) {
            Radio.cart.trigger('wine:add', this.model, parseInt(this.ui.quantityInput.val()));
        }
    });

    return WineListItem;
});
