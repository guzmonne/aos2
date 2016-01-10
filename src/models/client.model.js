import Parse from 'parse'

const Client = Parse.Object.extend('Client', {}, {
	defaults: {
		name: '',
		contact: [],
		identification: '',
		addresses: []
	},

	default(){
		return new Client(Object.assign({}, this.defaults))
	}
});

export default Client