import {RESET_ACTIVE_CLIENT, LOADING_CLIENTS, CLIENT_FETCH_SUCCESS, CLIENT_FETCH_ERROR, CLIENTS_FETCH_SUCCESS, CLIENTS_FETCH_ERROR, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_ERROR} from '../../state/action-types.js'
import { pushPath } from 'redux-simple-router'
import Parse from 'parse'
import Client from '../../models/client.model.js'
import _ from 'lodash'

export function fetchClient(id){
	return (dispatch, getState) => {
		const handleSuccess = (client) => {
			let collection = getState().clients.collection
			
			const clientInCollection = collection.find(c => c.id === client.id)

			if (!clientInCollection)
				collection = [...collection, client]

			dispatch(fetchClientSuccess(client, collection))
		}
		const handleError = (error) => dispatch(fetchClientError(error))
		
		const client = new Client({id: id})

		dispatch(resetActiveClient())
		dispatch(loadingClients())

		client.
			fetch().
			then( handleSuccess, handleError )
	}
}

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
			dispatch(createClientSuccess(client, Client.default()))
			dispatch(pushPath(`/clients/edit/${client.id}`))
		} 
		const handleError = error => dispatch(createClientError(error))

		const client = new Client(data);

		client.set('user', Parse.User.current())

		client.save(null).
			then(handleSuccess, handleError)
	}
}

export function resetActiveClient(){
	return {
		type: RESET_ACTIVE_CLIENT
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

export function fetchClientSuccess(client, collection){
	return {
		type: CLIENT_FETCH_SUCCESS,
		client,
		collection
	}
}

export function createClientSuccess(client, activeClient){
	return {
		type: CLIENT_CREATE_SUCCESS,
		activeClient,
		client
	}
}

export function fetchClientsError(error){
	return {
		type: CLIENTS_FETCH_ERROR,
		error
	}
}

export function fetchClientError(error){
	return {
		type: CLIENT_FETCH_ERROR,
		error
	}
}

export function createClientError(error){
	return {
		type: CLIENT_CREATE_ERROR,
		error
	}
}