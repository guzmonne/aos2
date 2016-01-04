import React from 'react';
import _ from 'lodash'
import { SaveButton, EditButton, CancelButton } from '../buttons.js'
import FormElementError from '../form-element-error.js'

class AccountWidget extends React.Component {
	constructor(props) {
    super(props);
    this.displayName = 'AccountWidget';
	}	

	render() {
		const isDisabled = !this.props.editable

		const toggledButton = (this.props.editable) ? 
			<CancelButton loading={this.props.updating} onClick={this.props.onCancel} style={{float: 'right'}}/> :
			<EditButton loading={this.props.updating} onClick={this.props.onEdit} style={{float: 'right'}} disabled={this.props.updating}/>

		const submit = e => {
			e.preventDefault()
			
			const data = {
				name: this.refs.name.value,
				email: this.refs.email.value
			}

			this.props.onSave(data)
		}

		const errorMessage = (this.props.error) ?
			<FormElementError message={this.props.error.message} /> :
			''
 
		return (
			<div className="container">
				<form onSubmit={submit}>
					<fieldset>
						<legend>Cuenta</legend>

						{errorMessage}

						<div className="form-element">
							<label htmlFor="name">Nombre</label>
							<input type="text" className="form-input" ref="name" defaultValue={this.props.currentUser.name} disabled={isDisabled}/>
						</div>
						<div className="form-element">
							<label htmlFor="username">Usuario</label>
							<input type="text" className="form-input" defaultValue={this.props.currentUser.username} disabled/>
						</div>
						<div className="form-element">
							<label htmlFor="email">Email</label>
							<input type="email" className="form-input" ref="email" defaultValue={this.props.currentUser.email} disabled={isDisabled}/>
						</div>

						{toggledButton}

						&nbsp;

						<SaveButton loading={this.props.updating} onClick={submit} disabled={!this.props.editable || this.props.updating}/>

					</fieldset>
				</form>
			</div>
		);
	}
}

AccountWidget.propTypes = {
	currentUser: React.PropTypes.object.isRequired
}

export default AccountWidget
