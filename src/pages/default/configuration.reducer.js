import {CHANGE_CONFIGURATION_TAB} from '../../state/action-types.js'

export default function configurationReducer (state={tab: 'general'}, action){
	switch (action.type){
		case CHANGE_CONFIGURATION_TAB:
			return {tab: action.tab}
		default:
			return state
	}
}