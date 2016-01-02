import {createStore} from 'redux'
import mainReducer from './main-reducer.js'

export const store = createStore(mainReducer);