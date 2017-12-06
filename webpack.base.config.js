const path = require('path');

var webpack = require('webpack');

module.exports = {
	entry: 'assets/js/init.js',
	output: {
		filename: 'wiwu.min.js',
		path: path.resolve(__dirname, 'public/assets')
	},
	resolve: {
		modules: [path.resolve(__dirname), 'node_modules'],
		alias: {
			'handlebars': 'handlebars/runtime.js'
		}
	},
	module: {
		rules: [
			{
				test: /\.html$/, loader: "handlebars-loader", query: {
					extensions: '.html'
				}
			},
			{
				test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
				loader: 'file-loader',
				options: {
					publicPath: '/'
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
};
