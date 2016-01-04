import {ENABLE_ACCOUNT_EDITION, DISABLE_ACCOUNT_EDITION, UPDATING_ACCOUNT, ACCOUNT_UPDATE_SUCCESS, ACCOUNT_UPDATE_ERROR} from '../../state/action-types.js'
import _ from 'lodash'
import {loginSuccess} from '../../pages/users/login.actions.js'
import Parse from 'parse'

export function enableAccountEdition(){
	return {
		type: ENABLE_ACCOUNT_EDITION
	}
}

export function disableAccountEdition(){
	return {
		type: DISABLE_ACCOUNT_EDITION
	}
}

export function updateAccount(data){
	if (!data) return;

	data = _.pick(data, 'name', 'email');


	return dispatch => {
	
		const handleSuccess = () => {
			const user = Parse.User.current();
			dispatch(accountUpdateSuccess());
			dispatch(loginSuccess(JSON.parse( JSON.stringify(user) )))
		}

		const handleError = error => {
			dispatch(accountUpdateError(error))
			dispatch(enableAccountEdition())
		}

		dispatch(updatingAccount())

		const user = Parse.User.current();

		Object.keys(data).forEach(key => user.set(key, data[key]));

		user.save().then(handleSuccess, handleError);
	}
}

export function updatingAccount(){
	return {
		type: UPDATING_ACCOUNT
	}
}

export function accountUpdateSuccess(){
	return {
		type: ACCOUNT_UPDATE_SUCCESS
	}
}

export function accountUpdateError(error){
	return {
		type: ACCOUNT_UPDATE_ERROR,
		error
	}
}