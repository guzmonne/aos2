import {FETCHING_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR} from '../../state/action-types.js'

const defaultState = {
	collection: [],
	lastFetch: null,
	isFetching: false,
	page: 1,
	error: false
}

export default function usersReducer (state=defaultState, action){
	switch(action.type){
		case FETCHING_USERS:
			return Object.assign(
				{},
				state,
				{isFetching: true}
			)
		case FETCH_USERS_SUCCESS:
			return Object.assign(
				{},
				state,
				{isFetching: false, error: false},
				{collection: action.users, lastFetch: new Date()}
			)
		case FETCH_USERS_ERROR:
			return Object.assign(
				{},
				state,
				{isFetching: false, error: action.error}
			)
		default:
			return state
	}
}