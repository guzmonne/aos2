import { RESET_ACTIVE_DEVICE, LOADING_DEVICES, DEVICE_DELETE_SUCCESS, DEVICE_DELETE_ERROR, DEVICE_UPDATE_SUCCESS, DEVICE_UPDATE_ERROR, DEVICE_FETCH_SUCCESS, DEVICE_FETCH_ERROR, DEVICES_FETCH_SUCCESS, DEVICES_FETCH_ERROR, DEVICE_CREATE_SUCCESS, DEVICE_CREATE_ERROR } from '../../state/action-types.js'
import { pushPath } from 'redux-simple-router'
import Parse from 'parse'
import Device from '../../models/device.model.js'
import _ from 'lodash'

export function deleteClient(deviceId){
	return (dispatch, getState) => {
		if (deviceId) return

		const handleSucces = () => {
			const collection = getState().
				devices.
				collection.
				filter(d => d.id !== deviceId)
			
			dispatch(deleteDeviceSuccess(collection))
		}

		const handleError = (error) => dispatch(deleteDeviceError(error))

		const device = new Device({id: deviceId})

		dispatch(loadingDevices())

		device.destroy().then(handleSuccess, handleError)
	}
}

export function fetchDevices(){
	return dispatch => {
		const handleSuccess = (devices) => dispatch(fetchDevicesSuccess(devices))
		const handleError = (error) => dispatch(fetchDevicesError(error))

		dispatch(loadingDevices())

		const query = new Parse.Query(Device)

		query.find({}).then(handleSuccess, handleError)
	}	
}

export function deleteDeviceSuccess(collection){
	return {
		type: DEVICE_DELETE_SUCCESS,
		collection
	}
}

export function deleteDeviceError(error){
	return {
		type: DEVICE_DELETE_ERROR,
		error
	}
}

export function fetchDevicesSuccess(devices){
	return {
		type: DEVICES_FETCH_SUCCESS,
		devices
	}
}

export function fetchDevicesError(error){
	return {
		type: DEVICES_FETCH_ERROR,
		error
	}
}

export function loadingDevices(){
	return {
		type: LOADING_DEVICES
	}
}