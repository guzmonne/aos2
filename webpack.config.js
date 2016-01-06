var getConfig = require('hjs-webpack')

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

module.exports = config