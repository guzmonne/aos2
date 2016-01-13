import React from 'react'
import { Modal, Button, Input } from 'react-bootstrap'

export default ({showModal, onClose, container, category, onAdd}) => {
	let subcategory = ''
	const updateSubcategory = (e) => subcategory = e.target.value
	const add = () => onAdd(subcategory)
	const addButton = (
		<Button bsStyle="success" onClick={add}><i className="fa fa-plus"></i></Button>
	)
	return (
    <Modal
      show={showModal}
      onHide={onClose}
      container={container}
      aria-labelledby="contained-modal-title"
      bsSize="small"
      backdrop={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">
        	<strong>Categoría: </strong>{` ${category}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      	<Input 
      		type="text"
      		placeholder="Nueva Subcategoría"
      		hasFeedback
      		onChange={updateSubcategory}
      		buttonAfter={addButton}
      	/>
      </Modal.Body>
    </Modal>
	)
}