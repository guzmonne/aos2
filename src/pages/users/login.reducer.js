import {LOGGING_IN_USER, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_USER} from '../../state/action-types.js'

const defaultState = {isLoggingIn: false, err: false}

export default function loginReducer (state=defaultState, action){
	switch (action.type){
		case LOGGING_IN_USER:
			return Object.assign(
				{},
				state,
				defaultState,
				{
					isLoggingIn: true
				}
			)
		case LOGIN_SUCCESS:
			return Object.assign(
				{},
				state,
				action.user,
				defaultState
			)
		case LOGIN_ERROR:
			return Object.assign(
				{},
				defaultState,
				{
					err: action.err
				}
			)
		case LOGOUT_USER:
			return Object.assign(
				{},
				defaultState
			)
		default:
			return state
	}
}