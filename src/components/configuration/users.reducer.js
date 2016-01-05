import {CREATING_USER, USER_CREATE_SUCCESS, USER_CREATE_ERROR, FETCHING_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, SHOWING_CREATE_USER_MODAL, HIDING_CREATE_USER_MODAL} from '../../state/action-types.js'

const defaultState = {
	collection: [],
	lastFetch: null,
	isFetching: false,
	page: 1,
	error: false,
	isShowingCreateModal: false
}

export default function usersReducer (state=defaultState, action){
	switch(action.type){
		case CREATING_USER:
			return Object.assign(
				{},
				state,
				{isCreatingUser: true, createUserError: false}
			)
		case USER_CREATE_SUCCESS:
			return Object.assign(
				{},
				state,
				{isCreatingUser: false, createUserError: false},
				{collection: [...state.collection, action.user]}
			)
		case USER_CREATE_ERROR:
			return Object.assign(
				{},
				state,
				{isCreatingUser: false, createUserError: action.error}
			)
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
		case SHOWING_CREATE_USER_MODAL:
			return Object.assign(
				{},
				state,
				{ isShowingCreateModal: true }
			)
		case HIDING_CREATE_USER_MODAL:
			return Object.assign(
				{},
				state,
				{ isShowingCreateModal: false }
			)
		default:
			return state
	}
}