import Parse from 'parse'
import _ from 'lodash'

export default class Model extends Parse.Object {
	constructor(name){
		super(name)
	}

	static default(){
		return (new this()).set( this.defaults() )
	}	

	static defaults(){
		let result = {}
		const schema = this.schema()

		if (!schema) throw new Error('schema is not defined')

		_.forEach(_.keys(schema), key => {
			result[key] = this.defaultFrom(schema[key]['type'], schema[key]['default'])	
		})

		return result
	}

	static defaultFrom(type='string', defaultValue){
		if (type === 'string') return defaultValue || ''
		if (type === 'array')  return defaultValue || []
		if (type === 'object') return defaultValue || {}
		if (type === 'date')   return defaultValue || new Date()
		if (type === 'bool')   return defaultValue || true
	}
	
	static pick(rawData){
		return Rx.Observable.just(_.pick(rawData, ...Object.keys(this.defaults)))
	}

	static runValidationFor(key, data, validation, validationValue){
		let result = null

		switch(validation){
			case "type":
				if(
						( validationValue === 'string' && !_.isString(data) ) ||
						( validationValue === 'number' && !_.isNumber(data) ) ||
						( validationValue === 'array'  && !_.isArray(data)  ) ||
						( validationValue === 'date'   && !_.isDate(data)   )
					)
					result = `"${key}" is not a ${validationValue}`
				break
			case "required":
				if ( _.isUndefined(data) || data === '' )
					result = `${key} is required` 
				break
			case "max":
				if (_.isString(data) && data.length > validationValue)
					result = `${key} has a maximum of ${validationValue} characters`
				break 
			case "min":
				if (_.isString(data) && data.length < validationValue)
					result = `${key} has a minimum of ${validationValue} characters`
				break 	
		}

		if (!_.isNull(result))
			return Rx.Observable.throw( {type: 'validation error', key, data, validation, validationValue, msg: result} )
		else
			return Rx.Observable.return({[key]: data})

	}

	static validate(data){
		if (!this.schema) return Rx.Observable.throw({msg: 'schema is undefined'})

		const schema = this.schema()

		if (!_.isObject(schema)) return Rx.Observable.throw({msg: 'schema must retun an object that describes the model'})	

		return Rx.Observable.
			fromArray( Object.keys( schema ) ).
			flatMap( key => this.runValidationsFor(key, data[key], schema[key]) )
	}

	static runValidationsFor(key, data, validations){
		if (!validations || !_.isObject(validations)) return Rx.Observable.just(data)

		return Rx.Observable.
			fromArray( Object.keys(validations) ).
			flatMap( validationKey => this.runValidationFor(key, data, validationKey, validations[validationKey]) ).
			last()
	}

}