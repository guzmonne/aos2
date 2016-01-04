import {LOGGING_IN_USER, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_USER} from '../../state/action-types.js'
import { pushPath } from 'redux-simple-router'
import Parse from 'parse'

function deserializeCurrent(){
	if (!Parse.User.current()) return {}
	return Parse.User.current().attributes
}

export function restoreLoginSessionToken(){
	return dispatch => {
		const user = deserializeCurrent();

		if (!user.sessionToken)
			dispatch(pushPath('/users/login'));
		else
			dispatch(loginSuccess(user))
	}
}

export function loggingInUser(){
	return {
		type: LOGGING_IN_USER
	}
}

export function loginSuccess(user){
	return {
		type: LOGIN_SUCCESS,
		user: user
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
		const handleSuccess = () => {
			dispatch(loginSuccess(deserializeCurrent()))
			dispatch(pushPath('/'));
		}
		const handleError = (err) => dispatch(loginError(err))

		dispatch(loggingInUser());

		Parse.User.logIn(username, password).
			then(handleSuccess ,handleError)
	}
}

export function logoutUser(){
	return dispatch => {
		const handleSuccess = () => {
			dispatch({type: LOGOUT_USER})
			dispatch(pushPath('/users/login'));
		}
		const handleError = (err) => dispatch(loginError(err))

		Parse.User.logOut().
			then(handleSuccess, handleError);
	}
}