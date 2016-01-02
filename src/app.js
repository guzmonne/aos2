require('../styles/override.styl');

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'
import { store } from './state/store.js'
import MainApp from './main-app.js'

syncReduxAndRouter(browserHistory, store)

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={MainApp} />
		</Router>
	</Provider>
	, document.getElementById('root')
);