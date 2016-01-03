import {CHANGE_CONFIGURATION_TAB} from '../../state/action-types.js'

export function changeConfigurationTab(tab){
	return {
		type: CHANGE_CONFIGURATION_TAB,
		tab
	}
}