import {SHOW_NAVBAR_MENU, HIDE_NAVBAR_MENU, SHOW_MODAL_OVERLAY, HIDE_MODAL_OVERLAY} from '../../state/action-types.js'
import {hideCreateUserModal} from '../../components/configuration/users.actions.js'

export function hideAll(){
	return dispatch => {		
		console.log('hideAll');
		dispatch(hideModalOverlay())
		dispatch(hideNavBarMenu())
		dispatch(hideCreateUserModal())
	}
}

export function toggleNavBarMenu() {
	return (dispatch, getState) => {
		const isShowingNavBarMenu = getState().mainLayout.isShowingNavBarMenu

		if (isShowingNavBarMenu)
			dispatch(hideNavBarMenu())
		else
			dispatch(showNavBarMenu())
	}
}

export function showNavBarMenu(){
	return {
		type: SHOW_NAVBAR_MENU
	}
}

export function hideNavBarMenu(){
	return {
		type: HIDE_NAVBAR_MENU
	}
}

export function showModalOverlay() {
	return {
		type: SHOW_MODAL_OVERLAY
	}
}

export function hideModalOverlay() {
	return {
		type: HIDE_MODAL_OVERLAY
	}
}