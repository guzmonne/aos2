import Parse from 'parse'

const Helper = Parse.Object.extend('Helper', {}, {
	defaults: {
		key: '',
		value: '',
		subvalue: []
	},

	default(){
		return new Helper(Object.assign({}, this.defaults))
	},

	subcategory(parent, value){
		return new Helper({
			key: 'subcategory',
			value,
			parent
		})
	},

	category(value){
		return new Helper({
			key: 'category',
			value
		})
	}
});

export default Helper