import React from 'react'
import UserForm from './user-form.js'

const CreateUserModal = (props) => {
	const onClose = (e) => {
		e.preventDefault()
		props.close()
	}

	const className = (props.modalIn) ? "modal fade in" : "modal fade in hidden" 

	return (
		<div className={className}>
			<div className="modal-dialog">
      	<div className="modal-content">
	      	<div className="modal-body">
			      <button className='close' aria-label="Close" onClick={onClose}>
			      	<span aria-hidden="true">×</span>
			      </button>
						<UserForm user={props.user}
											isNew={true}
											onSave={props.onSave} 
											legend={"Nuevo Usuario"}
											showPasswordInput={true}
											updating={props.updating}
											error={props.error}/>
      		</div>
      	</div>
			</div>
	  </div>
	)
}

CreateUserModal.propTypes = {
	user: React.PropTypes.object.isRequired,
	close: React.PropTypes.func.isRequired
}

export default CreateUserModal