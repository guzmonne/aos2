import {INCREMENT_COUNTER, DECREMENT_COUNTER} from './state/action-types.js'

export default function counterReducer (state=0, action){
	switch(action.type){
		case INCREMENT_COUNTER:
			return (state + action.ammount);
		case DECREMENT_COUNTER:
			return (state - action.ammount);
		default:
			return state
	}
}