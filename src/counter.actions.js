import {INCREMENT_COUNTER, DECREMENT_COUNTER} from './state/action-types.js'

export function incrementCounter(ammount){
	return {
		type: INCREMENT_COUNTER,
		ammount: ammount
	}
}

export function decrementCounter(ammount){
	return {
		type: DECREMENT_COUNTER,
		ammount: ammount
	}
}