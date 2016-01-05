import React from 'react'
import UserForm from './user-form.js'

const CreateUserModal = (props) => {
	const onClose = (e) => {
		e.preventDefault()
		props.close()
	}

	return (
		<div className='modal modal-no-sections modal__animated animated flipInX'>
      <div className="modal-align-form">
	      <a href='' className='modal-close' onClick={onClose}>×</a>
	  		<UserForm user={props.user}
	  							isNew={true}
	  							onSave={props.onSave} 
	  							legend={"Nuevo Usuario"}
	  							showPasswordInput={true}
	  							updating={props.updating}
	  							error={props.error}/>
      </div>
	  </div>
	)
}

CreateUserModal.propTypes = {
	user: React.PropTypes.object.isRequired,
	close: React.PropTypes.func.isRequired
}

export default CreateUserModal