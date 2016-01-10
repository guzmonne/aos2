import {LOADING_CLIENTS, CLIENTS_FETCH_SUCCESS, CLIENTS_FETCH_ERROR, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_ERROR} from '../../state/action-types.js'

const defaultClient = {name: '', contact: [], identification: '', addresses: []}

const defaultState = {
	collection: [],
	loading: false,
	error: null,
	activeClient: Object.assign({}, defaultClient),
	lastFetch: null
}

export default function clientsReducer(state=defaultState, action){
	switch (action.type){
		case LOADING_CLIENTS:
			return Object.assign(
				{},
				state,
				{loading: true}
			)
		case CLIENT_CREATE_SUCCESS:
			const client = action.resetClient ? Object.assign({}, defaultClient) : action.client
			return Object.assign(
				{},
				state,
				{loading: false, error: null},
				{collection: [...state.collection, action.client], activeClient: client}
			)
		case CLIENT_CREATE_ERROR:
			return Object.assign(
				{},
				state,
				{loading: false, error: action.error}
			)
		case CLIENTS_FETCH_SUCCESS:
			return Object.assign(
				{},
				state,
				{ loading: false, error: null },
				{ collection: action.clients, lastFetch: new Date() }
			)
		case CLIENTS_FETCH_ERROR:
			return Object.assign(
				{},
				state,
				{loading: false, error: action.error})
		default:
			return state
	}
}