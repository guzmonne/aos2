import {LOGGING_IN_USER, LOGIN_SUCCESS, LOGIN_ERROR} from '../../state/action-types.js'

function deserializeCurrent(){
	if (!Parse.User.current()) return {}
	return JSON.parse(JSON.stringify(Parse.User.current()))
}

export default function loginReducer (state={isLoggingIn: false, err: false}, action){
	switch (action.type){
		case LOGGING_IN_USER:
			return Object.assign(
				{},
				state,
				{
					isLoggingIn: true,
					err: false
				}
			)
		case LOGIN_SUCCESS:
			return Object.assign(
				{},
				state,
				deserializeCurrent(),
				{
					isLoggingIn: false,
					err: false
				}
			)
		case LOGIN_ERROR:
			return Object.assign(
				{},
				{
					isLoggingIn: false,
					err: action.err
				}
			)
		default:
			return state
	}
}