import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import mainReducer from './main-reducer.js'
import createLogger from 'redux-logger'

const logger = createLogger();

let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

export const store = createStoreWithMiddleware(mainReducer);