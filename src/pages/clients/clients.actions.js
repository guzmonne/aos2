import {CREATING_CLIENT, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_ERROR} from '../../state/action-types.js'
import { pushPath } from 'redux-simple-router'
import Client from '../../models/client.model.js'
import _ from 'lodash'

export function createClient(rawData){
	return dispatch => {
		const data = _.pick(rawData, 'name', 'identification', 'contact', 'addresses')

		dispatch(creatingClient())

		const handleSuccess = client => {
			dispatch(createClientSuccess(client, true))
			dispatch(pushPath('/clients'))
		} 
		const handleError = error => dispatch(createClientError(error))

		const client = new Client(data);

		client.save(null).
			then(handleSuccess, handleError)
	}
}

export function creatingClient(){
	return {
		type: CREATING_CLIENT
	}
}

export function createClientSuccess(client, resetClient){
	return {
		type: CLIENT_CREATE_SUCCESS,
		resetClient,
		client
	}
}

export function createClientError(error){
	return {
		type: CLIENT_CREATE_ERROR,
		error
	}
}