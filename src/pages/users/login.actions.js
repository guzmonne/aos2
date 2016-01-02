import {LOGGING_IN_USER, LOGIN_SUCCESS, LOGIN_ERROR} from '../../state/action-types.js'

export function loginUser(username, password){
	return {
		type: LOGGING_IN_USER,
		username,
		password
	}
}