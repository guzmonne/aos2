var getConfig = require('hjs-webpack')

var config = getConfig({
	in: 'src/app.js',
	out: 'public',
	clearBeforeBuild: true,
	isDev: process.env.NODE_ENV !== 'production',
	output: {
		hash: true,
	},
	urlLoaderLimit: 100000
});

module.exports = config