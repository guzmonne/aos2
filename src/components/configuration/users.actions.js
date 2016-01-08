import {CREATING_USER, USER_CREATE_SUCCESS, USER_CREATE_ERROR, FETCHING_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, SHOWING_CREATE_USER_MODAL, HIDING_CREATE_USER_MODAL} from '../../state/action-types.js'
import { showModalOverlay, hideModalOverlay } from '../../pages/default/main.layout.actions.js'
import _ from 'lodash'
import Parse from 'parse'

export function createUser(userData){
	return dispatch => {
		const data = _.pick(userData, 'name', 'username', 'password', 'email')
		const user = new Parse.User();

		const handleSuccess = (user) => {
			dispatch(userCreateSuccess(user))
			dispatch(toggleCreateUserModal())
		}
		const handleError   = (error) => dispatch(userCreateError(error))

		dispatch(creatingUser())

		_.forEach(_.keys(data), key => user.set(key, data[key]))

		user.save(null).then(handleSuccess, handleError)
	}
}

export function creatingUser(){
	return {
		type: CREATING_USER
	}
}

export function userCreateSuccess(user){
	return {
		type: USER_CREATE_SUCCESS,
		user
	}
}

export function userCreateError(error){
	return {
		type: USER_CREATE_ERROR,
		error
	}
}

export function toggleCreateUserModal(){
	return (dispatch, getState) => {
		const isShowingCreateModal = getState().users.isShowingCreateModal

		if (isShowingCreateModal) {
			dispatch(hideModalOverlay())
			dispatch(hideCreateUserModal())
		} else {
			dispatch(showModalOverlay())
			dispatch(showCreateUserModal())
		}
	}
}

export function showCreateUserModal(){
	return {
		type: SHOWING_CREATE_USER_MODAL
	}
}

export function hideCreateUserModal(){
	return {
		type: HIDING_CREATE_USER_MODAL
	}
}

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
}