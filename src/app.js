require('../styles/override.styl');

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './state/store.js'
import MainApp from './main-app.js'

render( <Provider store={store}><MainApp/></Provider>, document.getElementById('root') );