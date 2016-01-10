import {LOADING_CLIENTS, CLIENTS_FETCH_SUCCESS, CLIENTS_FETCH_ERROR, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_ERROR} from '../../state/action-types.js'
import { pushPath } from 'redux-simple-router'
import Parse from 'parse'
import Client from '../../models/client.model.js'
import _ from 'lodash'

export function fetchClients(){
	return dispatch => {
		const handleSuccess = (clients) => dispatch(fetchClientsSuccess(clients))
		const handleError = (error) => dispatch(fetchClientsError(error))

		dispatch(loadingClients())

		const query = new Parse.Query(Client)

		query.find({}).
			then(handleSuccess, handleError)
	}
}

export function createClient(rawData){
	return dispatch => {
		const data = _.pick(rawData, 'name', 'identification', 'contact', 'addresses')

		dispatch(loadingClients())

		const handleSuccess = client => {
			dispatch(createClientSuccess(client, true))
			dispatch(pushPath('/clients'))
		} 
		const handleError = error => dispatch(createClientError(error))

		const client = new Client(data);

		client.set('user', Parse.User.current())

		client.save(null).
			then(handleSuccess, handleError)
	}
}

export function loadingClients(){
	return {
		type: LOADING_CLIENTS
	}
}

export function fetchClientsSuccess(clients){
	return {
		type: CLIENTS_FETCH_SUCCESS,
		clients
	}
}

export function createClientSuccess(client, resetClient){
	return {
		type: CLIENT_CREATE_SUCCESS,
		resetClient,
		client
	}
}

export function fetchClientsError(error){
	return {
		type: CLIENTS_FETCH_ERROR,
		error
	}
}

export function createClientError(error){
	return {
		type: CLIENT_CREATE_ERROR,
		error
	}
}