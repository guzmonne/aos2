require('../styles/override.styl');

import React from 'react'
import { render } from 'react-dom'
import App from './main.app.js'
import Parse from 'parse'

Parse.initialize(
	'JFX5XaxaUT3F9NvmgjeeTqsPvKXW0Eap9PSZ5hpM',
	'recvEwie6fl4VtZ5K2jPi7r2w4PYlbZWPG6r2Rhc'
);

window.Parse = Parse;

render(<App />, document.getElementById('root'))