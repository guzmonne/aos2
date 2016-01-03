import expect from 'expect'
import {store} from './store.js'

describe('Store', () => {

	it('should initialize', () => {
		const actual = store.getState();
		const expected = {
			counter: 0,
			routing: { 
				changeId: 1, 
				path: undefined, 
				replace: false, 
				state: undefined
			},
			currentUser: {
				isLoggingIn: false,
				err: false
			}
		}

		expect(actual).toEqual(expected);
	});
})