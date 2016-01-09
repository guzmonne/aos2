import React from 'react'
import { SaveButton, EditButton, CancelButton } from '../buttons.js'
import FormElementError from '../form-element-error.js'
import {FormGroup} from '../form.js'

class UserForm extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'UserForm';
	}

	componentDidMount(){
		this.refs.name.focus()
	}

	render(){
		const {user, error, isNew, editable, updating, onCancel, onEdit, showPasswordInput} = this.props

		const isDisabled = !isNew && !editable

		const toggledButton = (this.props.editable) ? 
			<CancelButton loading={updating} onClick={onCancel} style={{float: 'right'}}/> :
			<EditButton loading={updating} onClick={onEdit} style={{float: 'right'}} disabled={updating}/>

		const submit = e => {
			e.preventDefault()
			
			const data = {
				name: this.refs.name.value,
				username: this.refs.username.value,
				email: this.refs.email.value,
				password: this.refs.password.value
			}

			this.props.onSave(data)
		}

		const errorMessage = (error) ?
			<FormElementError message={error.message} /> :
			''

		const passwordInput = (
			<div className="form-group">
				<label htmlFor="password" className="control-label col-lg-2">Contraseña</label>
				<div className="col-lg-10">
					<input placeholder="Contraseña" type="password" className="form-control" ref="password" disabled={isDisabled}/>
				</div>
			</div>
		)

		return (
			<form className="form-horizontal" onSubmit={submit}>
				<legend>{this.props.legend}</legend>
				{errorMessage}

				<div className="form-group">
					<label htmlFor="name" className="control-label col-lg-2">Nombre</label>
					<div className="col-lg-10">
						<input placeholder="Nombre" type="text" className={error ? "form-control error" : "form-control"} ref="name" defaultValue={user.name} disabled={isDisabled}/>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="username" className="control-label col-lg-2">Usuario</label>
					<div className="col-lg-10">
						<input placeholder="Usuario" type="text" className={error ? "form-control error" : "form-control"} ref="username" defaultValue={user.username} disabled={!isNew}/>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="email" className="control-label col-lg-2">Email</label>
					<div className="col-lg-10">
						<input placeholder="Email" type="email" className={error ? "form-control error" : "form-control"} ref="email" defaultValue={user.email} disabled={isDisabled}/>
					</div>
				</div>

				{showPasswordInput ? passwordInput : null}

				{isNew ? null : toggledButton}

				<SaveButton loading={updating} onClick={submit} disabled={!isNew && (!editable || updating)}/>
			</form>
		)
	}
}

UserForm.propTypes = {
	user: React.PropTypes.object.isRequired
}

export default UserForm