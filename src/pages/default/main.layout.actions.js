import {SHOW_MODAL_OVERLAY, HIDE_MODAL_OVERLAY} from '../../state/action-types.js'

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