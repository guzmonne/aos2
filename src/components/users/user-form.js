import React from 'react'
import { SaveButton, EditButton, CancelButton } from '../buttons.js'
import FormElementError from '../form-element-error.js'

class UserForm extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'UserForm';
	}	

	render(){
		const isDisabled = !this.props.isNew && !this.props.editable

		const toggledButton = (this.props.editable) ? 
			<CancelButton loading={this.props.updating} onClick={this.props.onCancel} style={{float: 'right'}}/> :
			<EditButton loading={this.props.updating} onClick={this.props.onEdit} style={{float: 'right'}} disabled={this.props.updating}/>

		const submit = e => {
			e.preventDefault()
			
			const data = {
				name: this.refs.name.value,
				username: this.refs.username.value,
				email: this.refs.email.value,
				password: this.refs.email.value
			}

			this.props.onSave(data)
		}

		const errorMessage = (this.props.error) ?
			<FormElementError message={this.props.error.message} /> :
			''

		const passwordInput = (
			<div className="form-element">
				<label htmlFor="password">Contraseña</label>
				<input type="password" className="form-input" ref="password" disabled={isDisabled}/>
			</div>
		)

		return (
			<form onSubmit={submit}>
				<fieldset>
					<legend>{this.props.legend}</legend>

					{errorMessage}

					<div className="form-element">
						<label htmlFor="name">Nombre</label>
						<input type="text" className="form-input" ref="name" defaultValue={this.props.user.name} disabled={isDisabled}/>
					</div>
					<div className="form-element">
						<label htmlFor="username">Usuario</label>
						<input type="text" className="form-input" ref="username" defaultValue={this.props.user.username} disabled={!this.props.isNew}/>
					</div>
					<div className="form-element">
						<label htmlFor="email">Email</label>
						<input type="email" className="form-input" ref="email" defaultValue={this.props.user.email} disabled={isDisabled}/>
					</div>

					{this.props.showPasswordInput ? passwordInput : null}

					{this.props.isNew ? null : toggledButton}

					<SaveButton loading={this.props.updating} onClick={submit} disabled={!this.props.isNew && (!this.props.editable || this.props.updating)}/>

				</fieldset>
			</form>
		)
	}
}

UserForm.propTypes = {
	user: React.PropTypes.object.isRequired
}


export default UserForm