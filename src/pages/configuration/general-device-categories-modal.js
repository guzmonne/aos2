import React from 'react'
import { Modal, Button, Input } from 'react-bootstrap'

export default class DeviceCategoryModal extends React.Component {
  constructor(props){
    super(props)

    this.displayName = 'DeviceCategoryModal'
  }

  componentDidUpdate(){
    if (this.props.showModal)
      this.refs.value.refs.input.focus()
  }

  render(){
    const {showModal, onClose, container, category, onAdd} = this.props

  	let subcategory = ''
  	
    const updateSubcategory = (e) => subcategory = e.target.value
  	
    const add = () => onAdd(subcategory)
  	
    const addButton = (
  		<Button bsStyle="success" onClick={add}><i className="fa fa-plus"></i></Button>
  	)
    
    const title = category ? 
      <span><strong>Categoría:{' '}</strong>{category}</span> :
      <strong>Nueva Categoría</strong>
    
    const placeholder = category ? 
      "Nueva Subcategoría":
      "Nueva Categoría"

    const onKeyDown = (e) => {
      if (e.keyCode !== 13) return
      add()
    }
 	
    return (
      <Modal
        show={showModal}
        onHide={onClose}
        container={container}
        aria-labelledby="contained-modal-title"
        bsSize="small"
        backdrop={false}
        autoFocus={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
          	{title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<Input 
        		type="text"
        		placeholder={placeholder}
        		hasFeedback
        		onChange={updateSubcategory}
        		buttonAfter={addButton}
            ref="value"
            onKeyDown={onKeyDown}
        	/>
        </Modal.Body>
      </Modal>
  	)
    
  }
}