/**
 * Winzerhof Wurst – www.winzerhof-wurst.at
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2017
 */

({
	baseUrl: 'public/js',
	mainConfigFile: 'public/js/config.js',
	name: 'init',
	out: 'public/js/wiwu.min.js',
	insertRequire: [
		'init'
	]
});
