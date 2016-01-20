import sinon from 'sinon/pkg/sinon'
import expect from 'expect'

import {
	loginUser,
	loggingInUser,
	loginSuccess,
	loginError
} from './login.actions.js'

const Parse = {
	User: {
		login(username, password){}
	}
}

describe('Login Actions', () => {

	describe('loggingInUser', () => {

		it('shold return a correct action', () => {
			const actual = loggingInUser();
			const expected = {
				type: 'LOGGING_IN_USER'
			}

			expect(actual).toEqual(expected)
		})

	})

	describe('loggingInUser', () => {
		it('shold return a correct action', () => {
			const actual = loginError(false);
			const expected = {
				type: 'LOGIN_ERROR',
				err: false
			}

			expect(actual).toEqual(expected)
		})
	})

	describe('loginUser', () => {
		it('should return a function'/*, () => {
			const loginUserThump = loginUser('test', 'test');
			expect(loginUserThump).to.be.a('function');
		}*/)

		it('should call the loggingInUser() method first'/*, () => {
			let loggingInUser = sinon.spy();
			const loginUserThump = loginUser('test', 'test');
			loginUserThump(function(){})
			expect(loggingInUser.calledOnce).to.be.ok();
		}*/)

	})

})