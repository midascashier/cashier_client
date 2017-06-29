var webpack = require('webpack');

module.exports = {
	entry: ['babel-polyfill', './js/main.jsx'],

	plugins: [
		new webpack.DefinePlugin({'process.env.NODE_ENV': "'production'"})
	],

	output: {
		// If in production mode we put the files into the dist folder instead
		path: process.env.NODE_ENV === 'production' ? './dist/' : './build/',
		filename: process.env.NODE_ENV === 'production' ? 'cashier_client-' + new Date().getTime() + '.min.js' : 'bundle.js'
	},

	devtool: "source-map",

	devServer: {
		inline: true,
		port: 7777
	},

	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',

			query: {
				presets: ['es2015', 'react']
			}
		}]
	}

};