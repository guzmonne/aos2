import expect from 'expect'
import {store} from './store.js'

describe('store', () => {

	it('should initialize', () => {
		const actual = store.getState();
		const expected = {
			couter: 0
		}

		expect(actual).toEqual(expected);
	});
})