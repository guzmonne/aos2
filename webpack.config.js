var getConfig = require('hjs-webpack')
var path = require('path')

var config = getConfig({
	in: 'src/app.js',
	out: 'public',
	clearBeforeBuild: true,
	isDev: process.env.NODE_ENV !== 'production',
	output: {
		hash: true,
	},
	urlLoaderLimit: 100000,
	html: function(context){
		return {
			'index.html': context.defaultTemplate(),
			'200.html': context.defaultTemplate(),
			'CNAME': 'aos.info.tm'
		}
	}
});

config.resolve.root = path.join(__dirname, 'src')
config.resolve.alias = {
	parse: 'parse.js'
}

module.exports = config