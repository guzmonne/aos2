import counterReducer from '../counter.reducer.js'

export default function mainReducer( state={}, action){
	return {
		counter: counterReducer(state.counter, action)
	}
}