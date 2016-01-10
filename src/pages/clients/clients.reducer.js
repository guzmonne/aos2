import {CREATING_CLIENT, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_ERROR} from '../../state/action-types.js'

const defaultClient = {name: '', contact: [], identification: '', addresses: []}

const defaultState = {
	clients: [],
	loading: false,
	error: null,
	activeClient: Object.assign({}, defaultClient)
}

export default function clientsReducer(state=defaultState, action){
	switch (action.type){
		case CREATING_CLIENT:
			return Object.assign(
				{},
				state,
				{loading: true}
			)
		case CLIENT_CREATE_SUCCESS:
			const client = action.resetClient ? Object.assign({}, defaultClient) : action.client
			console.log(client, action)
			return Object.assign(
				{},
				state,
				{loading: false, error: null},
				{clients: [...state.clients, action.client], activeClient: client}
			)
		case CLIENT_CREATE_ERROR:
			return Object.assign(
				{},
				state,
				{loading: false, error: action.error}
			)
		default:
			return state
	}
}