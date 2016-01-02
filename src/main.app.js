import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'
import { store } from './state/store.js'
import MainApp from './main-app.js'
import Login from './pages/users/login.page.js'

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
					<Route path="/" component={MainApp} />
					<Route path="/users/login" component={Login} />
				</Router>
			</Provider>
		)
	}
}

export default App