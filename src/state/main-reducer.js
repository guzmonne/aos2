import { routeReducer } from 'redux-simple-router'
import counterReducer from '../counter.reducer.js'
import loginReducer from '../pages/users/login.reducer.js'
import configurationReducer from '../pages/default/configuration.reducer.js'

export default function mainReducer( state={}, action){
	return {
		counter: counterReducer(state.counter, action),
		routing: routeReducer(state.routing, action),
		currentUser: loginReducer(state.currentUser, action),
		configuration: configurationReducer(state.configuration, action)
	}
}