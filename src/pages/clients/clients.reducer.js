import {CREATING_CLIENT, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_ERROR} from '../../state/action-types.js'

const defaultState = {
	clients: [],
	isCreatingClient: false,
	error: null
}

export default function clientsReducer(state=defaultState, action){
	switch (action.type){
		case CREATING_CLIENT:
			return Object.assign(
				{},
				state,
				{isCreatingClient: true}
			)
		case CLIENT_CREATE_SUCCESS:
			return Object.assign(
				{},
				state,
				{isCreatingClient: false, error: null},
				{clients: [...state.clients, action.client]}
			)
		case CLIENT_CREATE_ERROR:
			return Object.assign(
				{},
				state,
				{isCreatingClient: false, error: action.error}
			)
		default:
			return state
	}
}