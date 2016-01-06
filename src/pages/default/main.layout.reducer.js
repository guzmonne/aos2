import {SHOW_NAVBAR_MENU, HIDE_NAVBAR_MENU, SHOW_MODAL_OVERLAY, HIDE_MODAL_OVERLAY} from '../../state/action-types.js'

const defaultState = {
	isShowingOverlay: false,
	isShowingNavBarMenu: false
}

export default function mainLayoutReducer (state=defaultState, action){
	switch (action.type){
		case SHOW_MODAL_OVERLAY:
			return Object.assign(
				{},
				state,
				{isShowingOverlay: true}
			)
		case HIDE_MODAL_OVERLAY:
			return Object.assign(
				{},
				state,
				{isShowingOverlay: false}
			)
		case SHOW_NAVBAR_MENU:
			return Object.assign(
				{},
				state,
				{isShowingNavBarMenu: true}
			)
		case HIDE_NAVBAR_MENU:
			return Object.assign(
				{},
				state,
				{isShowingNavBarMenu: false}
			)
		default:
			return state
	}
}