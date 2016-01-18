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
import Device from './models/device.model.js'

window.Parse = Parse;
window.Helper = Helper;
window.Device = Device;

render(<App />, document.getElementById('root'))