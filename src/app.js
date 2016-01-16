require('../styles/css/bootstrap.css')
require('../styles/css/barnie.css')
require('../styles/css/animate.css');
require('../node_modules/font-awesome/css/font-awesome.css');
require('../styles/override.styl');

import React from 'react'
import { render } from 'react-dom'
import App from './main.app.js'
import Parse from 'parse'
import Helper from './models/helper.model.js'

import Kefir from 'kefir'

Parse.initialize(
	'JFX5XaxaUT3F9NvmgjeeTqsPvKXW0Eap9PSZ5hpM',
	'recvEwie6fl4VtZ5K2jPi7r2w4PYlbZWPG6r2Rhc'
);

window.Parse = Parse;
window.Helper = Helper;
window.Kefir = Kefir;

render(<App />, document.getElementById('root'))