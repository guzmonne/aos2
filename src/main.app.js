import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'
import { store } from './state/store.js'
import MainLayout from './pages/default/main.layout'
import Login from './pages/users/login.page.js'
import Dashboard from './pages/default/dashboard.js'
import Configuration from './pages/default/configuration.js'
import Clients from './pages/clients/clients.js'

syncReduxAndRouter(browserHistory, store)

class App extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'App'
	}

	render(){
		return (
			<Provider store={store}>
				<Router history={browserHistory}>
					<Route path="/" component={MainLayout}>
						<IndexRoute component={Dashboard} />
						<Route path="configuration" component={Configuration} />
						<Route path="clients" component={Clients} />
					</Route>
					<Route path="users/login" component={Login} />
				</Router>
			</Provider>
		)
	}
}

export default App