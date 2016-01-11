import {RESET_ACTIVE_CLIENT, LOADING_CLIENTS, CLIENT_DELETE_SUCCESS, CLIENT_DELETE_ERROR, CLIENT_UPDATE_SUCCESS, CLIENT_UPDATE_ERROR, CLIENT_FETCH_SUCCESS, CLIENT_FETCH_ERROR, CLIENTS_FETCH_SUCCESS, CLIENTS_FETCH_ERROR, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_ERROR} from '../../state/action-types.js'
import { pushPath } from 'redux-simple-router'
import Parse from 'parse'
import Client from '../../models/client.model.js'
import _ from 'lodash'

export function deleteClient(clientId){
	return (dispatch, getState) => {
		if (!clientId) return

		const handleSuccess = () => {
			const collection = getState().
				clients.
				collection.
				filter(c => c.id !== clientId )
			
			dispatch(deleteClientSuccess(collection))
		}
		
		const handleError = (error) => dispatch(deleteClientError(error))
		
		const client = new Client({id: clientId})

		client.destroy().then(handleSuccess, handleError)
	}
}

export function updateClient(rawData){
	return (dispatch, getState) => {
		const data = _.pick(rawData, 'id', 'name', 'identification', 'contact', 'addresses')
		
		const handleSuccess = (client) => dispatch(updateClientSuccess())
		const handleError = (error) => dispatch(updateClientError(error))

		dispatch(loadingClients())
		
		const client = getState().clients.activeClient.set(data)

		client.save().then(handleSuccess, handleError)
	}
}

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

export function updateClientSuccess(){
	return {
		type: CLIENT_UPDATE_SUCCESS
	}
}

export function updateClientError(){
	return {
		type: CLIENT_UPDATE_ERROR
	}
}


export function deleteClientSuccess(collection){
	return {
		type: CLIENT_DELETE_SUCCESS,
		collection
	}
}

export function deleteClientError(){
	return {
		type: CLIENT_DELETE_ERROR
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