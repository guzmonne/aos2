import {SHOW_MODAL_OVERLAY, HIDE_MODAL_OVERLAY} from '../../state/action-types.js'

const defaultState = {
	isShowingOverlay: false
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
		default:
			return state
	}
}