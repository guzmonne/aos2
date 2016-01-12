import React from 'react'
import DeleteDialog from '../delete-dialog.js'

export default ({showModal, closeModal, confirmDel}) => {
	return (
		<DeleteDialog 
			showModal={showModal}
			closeModal={closeModal}
			confirmDel={confirmDel}>
			<p className="text-center">¿Esta seguro que desea eliminar este cliente?</p>
		</DeleteDialog>
	)
}