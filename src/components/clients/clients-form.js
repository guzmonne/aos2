import React from 'react'
import {Input, Button, ButtonToolbar} from 'react-bootstrap'
import Contact from './contact.js'
import Address from './address.js'

class ClientsForm extends React.Component {
	constructor(props){
		super(props);
		this.displayName = 'ClientsForm'
		this.submit = this.submit.bind(this)
		this.onChangeContact = this.onChangeContact.bind(this)
		this.removeContact = this.removeContact.bind(this)
		this.addContact = this.addContact.bind(this)
		this.state = Object.assign({}, this.props.client, {contactInputs: {type: 'phone', value: '', description: ''} })
	}

	submit(e){
		e.preventDefault()

		const {name, identification, contact, addresses} = this.state

		const data = {
			name, identification, contact, addresses
		}

		this.props.onSubmit(data)
	}

	update(key){
		const updatedObject = {[key]: this.refs[key].getValue()}
		
		this.setState(Object.assign({}, this.state, updatedObject));
	}

	onChangeContact(data, index){
		let newState = Object.assign({}, this.state)
		if (data){
			if (index === undefined)
				newState.contactInputs = data
			else
				newState.contact[index] = data
		}
		this.setState(newState)
	}

	removeContact(index){
		this.state.contact = [...this.state.contact.slice(0, index), ...this.state.contact.slice(index + 1)]
	}

	addContact(contact){
		this.state.contact = [...this.state.contact, contact]
		this.state.contactInputs.value = ''
	}

	render(){
		const client = this.state

		return (
			<form onSubmit={this.submit} className="form-horizontal">
				<Input type="text" labelClassName="col-xs-2" onChange={() => {this.update('name')}} wrapperClassName="col-xs-10" label="Nombre" ref="name" value={client.name}/>
				<Input type="text" labelClassName="col-xs-2" onChange={() => {this.update('identification')}} wrapperClassName="col-xs-10" label="ID" ref="identification" value={client.identification}/>
				
				<Contact onChange={this.onChangeContact} first={true} onAdd={this.addContact} contact={ this.state.contactInputs }/>

				{client.contact.map( (contact, index) => <Contact onChange={(data) => this.onChangeContact(data, index)} contact={contact} onRemove={() => this.removeContact(index)} key={index}/>)}
 
				<Input type="text" labelClassName="col-xs-2" onChange={() => {this.update('addresses')}} wrapperClassName="col-xs-10" label="Direciones" ref="addresses" value={client.addresses}/>

				<div className="form-group">
					<div className="col-xs-offset-2 col-xs-10">
						<div className="pull-right">
							<Button bsStyle="default" type="reset" pullRight>Cancelar</Button>
						</div>
						<Button bsStyle="primary" type="submit">Aceptar</Button>
					</div>
				</div>
			
			</form>
		)	
	}
}

ClientsForm.propTypes = {
	client: React.PropTypes.object.isRequired
}

export default ClientsForm