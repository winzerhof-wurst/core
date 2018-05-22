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

	var Page = require('./page');

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
				description: 'Aktuelles von unserem Betrieb. Ankündigungen anstehender Veranstaltungen. Markttermine für den Wochenmarkt Leonding.',
				url: 'aktuelles'
			});
			this.add({
				id: 'about',
				name: 'Unser Betrieb',
				description: 'Unser Familienbetrieb befindet sich in Schrattenthal, der '
					+ 'kleinsten Weinstadt im Weinviertel. Der Weinbau hat bei uns Tradition, und unsere Wurzeln reichen bis in das Jahr 1836 zurück',
				url: 'betrieb'
			});
			this.add({
				id: 'rooms',
				name: 'Gästezimmer',
				description: 'Getreu unserem Motto "Komm als Gast und geh als Freund" ist es unser Bestreben, Sie bestmöglich zu '
					+ ' verwöhnen und Ihren Aufenthalt bei uns zu einem unvergesslichen Erlebnis zu machen. Genießen Sie die Tage '
					+ 'in unserem Haus in den 3 Zimmern mit allem Komfort - ausgezeichnet mit 4 Blumen - und Blick auf den'
					+ 'liebevoll restaurierten Innenhof.',
				url: 'gaestezimmer'
			});
			this.add({
				id: 'wines',
				name: 'Weinkarte',
				description: 'Unsere aktuellen Weine. Die Hauptsorten sind Grüner Veltliner, Riesling, Gelber Muskateller, Blauer Portugieser und Blauer Zweigelt.',
				url: 'weinkarte'
			});
			this.add({
				id: 'tidbits',
				name: 'Schmankerl',
				description: 'Unsere Schmankerl, wie Traubensaft, Kürbiskernöl und Kürbiskerne.',
				url: 'schmankerl'
			});
			this.add({
				id: 'contact',
				name: 'Kontakt',
				description: 'Hier finden Sie unsere Kontaktdaten und die Anreise nach Schrattenthal.',
				url: 'kontakt'
			});
			this.add({
				id: 'imprint',
				name: 'Impressum',
				description: 'Unser Impressum und unsere allgemeinen Geschäftsbedingungen',
				url: 'impressum'
			});
			this.add({
				id: 'privacy',
				name: 'Datenschutz',
				description: 'Unsere Datenschutzbestimmungen',
				url: 'datenschutz'
			});
		}

	});

	return Pages;
});
