import { routeReducer } from 'redux-simple-router'
import loginReducer from '../pages/users/login.reducer.js'
import configurationReducer from '../pages/default/configuration.reducer.js'
import accountReducer from '../components/configuration/account.reducer.js'
import usersReducer from '../components/configuration/users.reducer.js'
import mainLayoutReducer from '../pages/default/main.layout.reducer.js'
import clientsReducer from '../pages/clients/clients.reducer.js'
import devicesReducer from '../pages/devices/devices.reducer.js'

export default function mainReducer( state={}, action){
	return {
		routing: routeReducer(state.routing, action),
		currentUser: loginReducer(state.currentUser, action),
		configuration: configurationReducer(state.configuration, action),
		account: accountReducer(state.account, action),
		users: usersReducer(state.users, action),
		mainLayout: mainLayoutReducer(state.mainLayout, action),
		clients: clientsReducer(state.clients, action),
		devices: devicesReducer(state.devices, action)
	}
}