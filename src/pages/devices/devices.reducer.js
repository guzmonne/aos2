import { RESET_ACTIVE_DEVICE, LOADING_DEVICES, DEVICE_DELETE_SUCCESS, DEVICE_DELETE_ERROR, DEVICE_UPDATE_SUCCESS, DEVICE_UPDATE_ERROR, DEVICE_FETCH_SUCCESS, DEVICE_FETCH_ERROR, DEVICES_FETCH_SUCCESS, DEVICES_FETCH_ERROR, DEVICE_CREATE_SUCCESS, DEVICE_CREATE_ERROR } from '../../state/action-types.js'
import Device from '../../models/device.model.js'

const defaultState = {
	collection: [],
	loading: false,
	error: null,
	activeDevice: Device.default(),
	lastFetch: null
}

export default function devicesReducer (state=defaultState, action){
	switch(action.type){
		case LOADING_DEVICES:
			return Object.assign(
				{},
				state,
				{loading: true}
			)
		case DEVICES_FETCH_SUCCESS:
			return Object.assign(
				{},
				state,
				{loading: false, error: null, collection: action.devices}
			)
		case DEVICES_FETCH_ERROR:
			return Object.assign(
				{},
				state,
				{loading: false, error: action.error}
			)
		case DEVICE_DELETE_SUCCESS:
			return Object.assign(
				{},
				state,
				{collection: action.collection, loading: false, error: null}
			)
		case DEVICE_DELETE_ERROR:
			return Object.assign(
				{},
				state,
				{error: action.error, loading: false}
			)
		default:
			return state

	}
}