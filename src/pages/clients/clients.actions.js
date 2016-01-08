import {CREATING_CLIENT, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_ERROR} from '../../state/action-types.js'
import { pushPath } from 'redux-simple-router'
import Parse from 'parse'
import _ from 'lodash'

function createClient(data){
	return dispatch => {
		const client = _.pick(data, 'name', 'identification', 'contact', 'addresses')

		dispatch(creatingClient())

		const handleSuccess = client => dispatch(createClientSuccess(client))
		const handleError = error => dispatch(createClientError(error))

		
	}
}

function creatingClient(){
	return {
		type: CREATING_CLIENT
	}
}