import Parse from 'parse'
import Model from './model.js'
import Rx from 'rx'
import _ from 'lodash'

const defaults = {
	brand: '',
	category: '',
	subcategory: '',
	model: '',
	description:''
}

//const Device = Model.extend('Device', {
export default class Device extends Model {
	constructor(){
		super('Device')
	}

	static schema() {
		return {
			brand: {
				type: 'string',
				required: true
			},
			category: {
				type: 'string',
				required: true,
			},
			subcategory: {
				type: 'string',
				required: true
			},
			model: {
				type: 'string',
				required: true
			},
			description: {
				type: 'string',
				required: true,
				max: 256,
				min: 10
			}
		}
	}

	static create(rawData=this.attributes){
		return Rx.Observable.
			just(rawData).
			flatMap(rawData => this.validate(rawData)).
     	reduce((pieces, piece) => Object.assign({}, pieces, piece), {}).
     	flatMap(data => Rx.Observable.
     		fromPromise( new Device().save(data) )
     	)
	}
}

Parse.Object.registerSubclass('Device', Device)