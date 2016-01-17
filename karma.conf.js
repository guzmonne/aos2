var webpack = require('webpack')
var path = require('path')

module.exports = function(config){
	config.set({
		browsers: ['Chrome'],
		singleRun: true,
		frameworks: ['mocha', 'sinon', 'chai'],
		files: [
      'tests.webpack.js' //just load this file
    ],
		preprocessors: {
			'tests.webpack.js': ['webpack', 'sourcemap']
		},
		reporters: ['story'],
		webpack: {
			resolve: {
				root: path.join(__dirname, 'src'),
				alias: {
					parse: 'parse.js'
				},
				extensions: ['', '.js', '.jsx']
			},
			devtool: 'inline-source-map',
			module: {
				loaders: [
					{ test: /\.js$/, loader: 'babel-loader'},
					{ test: /sinon\.js$/, loader: "imports?define=>false,require=>false" }
				]
			}
		},
		webpackServer: {
			noInfo: true
		}
	})
}