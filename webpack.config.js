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

console.log('*****************************************************')
console.log('*****************************************************')
console.log(config)
console.log('*****************************************************')
console.log('*****************************************************')
console.log(config.plugins)
console.log('*****************************************************')
console.log('*****************************************************')
console.log(config.module.loaders)
console.log('*****************************************************')
console.log('*****************************************************')
console.log(config.entry)
console.log('*****************************************************')
console.log('*****************************************************')
module.exports = config