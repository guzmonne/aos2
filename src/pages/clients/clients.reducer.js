import {RESET_ACTIVE_CLIENT, LOADING_CLIENTS, CLIENT_DELETE_SUCCESS, CLIENT_DELETE_ERROR, CLIENT_UPDATE_SUCCESS, CLIENT_UPDATE_ERROR, CLIENT_FETCH_SUCCESS, CLIENT_FETCH_ERROR, CLIENTS_FETCH_SUCCESS, CLIENTS_FETCH_ERROR, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_ERROR} from '../../state/action-types.js'
import Client from '../../models/client.model.js'

const defaultClient = {name: '', contact: [], identification: '', addresses: []}

const defaultState = {
	collection: [],
	loading: false,
	error: null,
	activeClient: Client.default(),
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
			return Object.assign(
				{},
				state,
				{loading: false, error: null},
				{collection: [...state.collection, action.client], activeClient: action.activeClient}
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
		case CLIENT_FETCH_SUCCESS:
			return Object.assign(
				{},
				state,
				{loading: false, error: null},
				{collection: action.collection, activeClient: action.client}
			)
		case CLIENT_FETCH_ERROR:
			return Object.assign(
				{},
				state,
				{loading: false, error: null}
			)
		case RESET_ACTIVE_CLIENT:
			return Object.assign(
				{},
				state,
				{loading: false, error: null, activeClient: Client.default()}
			)
		case CLIENT_UPDATE_SUCCESS:
			return Object.assign(
				{},
				state,
				{ loading: false, error: null }
			)
		case CLIENT_UPDATE_ERROR:
			return Object.assign(
				{},
				state,
				{ loading: false, error: action.error } 
			)
		case CLIENT_DELETE_SUCCESS:
			return Object.assign(
				{},
				state,
				{ loading: false, error: null, collection: action.collection }
			)
		case CLIENT_DELETE_ERROR:
			return Object.assign(
				{},
				state,
				{ loading: false, error: action.error } 
			)
		default:
			return state
	}
}