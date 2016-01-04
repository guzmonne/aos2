import React from 'react';
import _ from 'lodash'
import { SaveButton, EditButton, CancelButton } from '../buttons.js'

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

			console.log(data)

			this.props.onSave(data)
		}

		return (
			<div className="container">
				<form onSubmit={submit}>
					<fieldset>
						<legend>Cuenta</legend>

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

						<SaveButton loading={this.props.updating} onClick={submit} disabled={!this.props.editable || this.props.loading}/>

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
