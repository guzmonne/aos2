import {FETCHING_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR} from '../../state/action-types.js'
import Parse from 'parse'

export function fetchingUsers(){
	return {type: FETCHING_USERS}
}

export function fetchUsersSuccess(users){
	return {
		type: FETCH_USERS_SUCCESS,
		users
	}
}

export function fetchUsersError(error){
	return {
		type: FETCH_USERS_ERROR,
		error
	}
}

export function fetchUsers(){
	return (dispatch, getState) => {

		let lastFetch, state = getState().users;

		if (state.lastFetch){
			const msSinceLastFetch = new Date().getTime() - state.lastFetch.getTime()
			if (msSinceLastFetch < 300000) return
		}

		_fetchUsers(dispatch);
	}
}

function _fetchUsers(dispatch){
	const handleSuccess = (users) => {
		dispatch(fetchUsersSuccess(users))
	}

	const handleError = (error) => {
		dispatch(fetchUsersError(error))
	}

	dispatch(fetchingUsers())

	const query = new Parse.Query(Parse.User);

	query.find().then(handleSuccess, handleError);
}

export function forceFetchUsers(){
	return (dispatch) => _fetchUsers(dispatch)
}