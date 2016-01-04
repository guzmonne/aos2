import {ENABLE_ACCOUNT_EDITION, DISABLE_ACCOUNT_EDITION, UPDATING_ACCOUNT, ACCOUNT_UPDATE_SUCCESS, ACCOUNT_UPDATE_ERROR} from '../../state/action-types.js'

const defaultState = {editable: false, updating: false};

export default function accountReducer (state=defaultState, action){
	switch (action.type){
		case ENABLE_ACCOUNT_EDITION:
			return Object.assign(
				{},
				defaultState,
				{ editable: true }
			)
		case DISABLE_ACCOUNT_EDITION:
			return Object.assign(
				{},
				defaultState,
				{ editable: false }
			)
		case UPDATING_ACCOUNT:
			return Object.assign(
				{},
				state,
				{ updating: true, editable: false }
			)
		case ACCOUNT_UPDATE_SUCCESS:
			return Object.assign(
				{},
				defaultState
			)
		case ACCOUNT_UPDATE_ERROR:
			return Object.assign(
				{},
				state,
				{updating: false, error: action.error}
			)
		default:
			return state
	}
}