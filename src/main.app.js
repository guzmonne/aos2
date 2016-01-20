import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'
import { store } from './state/store.js'
/*DEFAULT*/
import MainLayout from './pages/default/main.layout'
import Dashboard from './pages/default/dashboard.js'
import Configuration from './pages/default/configuration.js'
/*USERS*/
import Login from './pages/users/login.page.js'
/*CLIENTS*/
import Clients from './pages/clients/clients.js'
import ClientsCreate from './pages/clients/clients-create.js'
import ClientsEdit from './pages/clients/clients-edit.js'
/*CONFIGURATION*/
import Account from './components/configuration/account.js'
import Users from './components/configuration/users.js'
import GeneralConfig from './pages/configuration/general.js'
/*DEVICES*/
import Devices from './pages/devices/devices.js'
import DevicesCreate from './pages/devices/devices-create.js'


syncReduxAndRouter(browserHistory, store)

export default (props) => {
	return (
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={MainLayout}>
					<IndexRoute component={Dashboard} />
					<Route path="configuration" component={Configuration}>
						<IndexRoute component={GeneralConfig} />
						<Route path="account" component={Account}/>
						<Route path="users" component={Users}/>
					</Route>
					 
					<Route path="clients" component={Clients} />
					<Route path="clients/create" component={ClientsCreate} />
					<Route path="clients/edit/:id" component={ClientsEdit} />

					<Route path="devices" component={Devices} />
					<Route path="devices/create" component={DevicesCreate} />

				</Route>
				<Route path="/users/login" component={Login} />
			</Router>
		</Provider>
	)
}