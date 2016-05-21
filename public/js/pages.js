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

    var Page = require('page');

    /**
     * @class Pages
     */
    var Pages = Backbone.Collection.extend({
        model: Page,
        initialize: function () {
            this.add({
                id: 'default',
                url: ''
            });
            this.add({
                id: 'news',
                url: 'aktuelles'
            });
            this.add({
                id: 'about',
                url: 'betrieb'
            });
            this.add({
                id: 'rooms',
                url: 'zimmer'
            });
            this.add({
                id: 'wines',
                url: 'weinkarte'
            });
            this.add({
                id: 'tidbits',
                url: 'schmankerl'
            });
            this.add({
                id: 'contact',
                url: 'kontakt'
            });
        }
    });

    return Pages;
});
