import { pushPath } from 'redux-simple-router'
import { store } from '../state/store.js'
import { loginSuccess } from '../pages/users/login.actions.js'

export function requireAuth () {
	const { currentUser } = store.getState();

	if (!currentUser.sessionToken){
		store.dispatch(pushPath('users/login'));
	}
}

export function 

