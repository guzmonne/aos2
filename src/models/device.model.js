import Parse from 'parse'

const Device = Parse.Object.extend('Device', {}, {
	defaults: {
		brand: '',
		family: '',
		subfamily: '',
		model: '',
		description:''
	},

	default(){
		return new Device( Object.assign({}, this.defaults) )
	}
})

export default Device