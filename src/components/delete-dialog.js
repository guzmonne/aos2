import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default ({showModal, closeModal, confirmDel, children}) => {
	return (
		<Modal show={showModal} onHide={closeModal} backdrop={true}>
			<Modal.Header closeButton>
        <Modal.Title>
        	<span className="text-warning">
	        	<i className="fa fa-exclamation-triangle"></i>
	        	{' '}
	        	¡Atención!
        	</span>
      	</Modal.Title>
      </Modal.Header>
			<Modal.Body>
				{children}
			</Modal.Body>
			<Modal.Footer>
				<Button bsStyle="default" onClick={closeModal}>
					Cancelar
				</Button>
				<div className="pull-left">
					<Button bsStyle="primary" onClick={confirmDel}>
						Aceptar
					</Button>
				</div>
			</Modal.Footer>
		</Modal>	
	)
}