import {LOGGING_IN_USER, LOGIN_SUCCESS, LOGIN_ERROR} from '../../state/action-types.js'
import Parse from 'parse'


export function loggingInUser(){
	return {
		type: LOGGING_IN_USER
	}
}

export function loginSuccess(){
	return {
		type: LOGIN_SUCCESS
	}
}

export function loginError(err={message: 'something is wrong'}){
	return {
		type: LOGIN_ERROR,
		err
	}
}

export function loginUser(username, password){
	return dispatch => {
		const handleSuccess = () => dispatch(loginSuccess())
		const handleError = (err) => dispatch(loginError(err))

		dispatch(loggingInUser());

		Parse.User.logIn(username, password).
			then(handleSuccess ,handleError)
	}
}