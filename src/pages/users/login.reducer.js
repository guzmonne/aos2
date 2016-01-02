import {LOGGING_IN_USER, LOGIN_SUCCESS, LOGIN_ERROR} from '../../state/action-types.js'

export default function loginReducer (state={}, action){
	switch (action.type){
		case LOGGING_IN_USER:
			return { username: action.username, password: action.password }
		default:
			return state
	}
}