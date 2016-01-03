var webpack = require('webpack')

module.exports = function(config){
	config.set({
		browsers: ['Chrome'],
		singleRun: true,
		frameworks: ['mocha', 'sinon'],
		files: [
      'tests.webpack.js' //just load this file
    ],
		preprocessors: {
			'tests.webpack.js': ['webpack', 'sourcemap']
		},
		reporters: 'dots',
		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: [
					{ test: /\.js$/, loader: 'babel-loader' },
					{ test: /sinon\.js$/, loader: "imports?define=>false,require=>false" }
				]
			}
		},
		webpackServer: {
			noInfo: true
		}
	})
}