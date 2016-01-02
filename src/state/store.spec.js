import expect from 'expect'
import {store} from './store.js'

describe('store', () => {

	it('should initialize', () => {
		const actual = store.getState();

		console.log(store.getState())

		const expected = {
			counter: 0,
			routing: { 
				changeId: 1, 
				path: undefined, 
				replace: false, 
				state: undefined
			}
		}

		expect(actual).toEqual(expected);
	});
})