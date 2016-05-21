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
                name: '',
                url: ''
            });
            this.add({
                id: 'news',
                name: 'Aktuelles',
                url: 'aktuelles'
            });
            this.add({
                id: 'about',
                name: 'Betrieb',
                url: 'betrieb'
            });
            this.add({
                id: 'rooms',
                name: 'Gästezimmer',
                url: 'gaestezimmer'
            });
            this.add({
                id: 'wines',
                name: 'Weinkarte',
                url: 'weinkarte'
            });
            this.add({
                id: 'tidbits',
                name: 'Schmankerl',
                url: 'schmankerl'
            });
            this.add({
                id: 'contact',
                name: 'Kontakt',
                url: 'kontakt'
            });
        }
    });

    return Pages;
});
