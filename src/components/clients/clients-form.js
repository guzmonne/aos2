import React from 'react'
import {Input, Button, ButtonToolbar} from 'react-bootstrap'
import Contact from './contact.js'
import Address from './address.js'

class ClientsForm extends React.Component {
	constructor(props){
		super(props);
		this.displayName     = 'ClientsForm'
		this.submit          = this.submit.bind(this)
		//this.onChangeContact = this.onChangeContact.bind(this)
		//this.removeContact   = this.removeContact.bind(this)
		this.addContact      = this.addContact.bind(this)
		this.addAddress      = this.addAddress.bind(this)
		this.remove          = this.remove.bind(this)
		
		this.onChangeContact = this.onChangeSubForm('contact', 'contactInputs').bind(this)
		this.onChangeAddress = this.onChangeSubForm('addresses', 'addressesInputs').bind(this)

		this.defaultAddressesInputs = {
			street: '',
			location: '',
			state: ''
		}
		
		this.state = Object.assign(
			{},
			this.props.client,
			{
				contactInputs: {
					type: 'phone',
					value: '',
					description: ''
				},
				addressesInputs: this.defaultAddressesInputs
			}
		)
	}

	submit(e){
		e.preventDefault()

		let {name, identification, contact, addresses, contactInputs, addressesInputs} = this.state
		let errors = {}

		if (name === '')
			errors.name = 'El nombre del cliente no puede quedar vacío.'
		if (identification === '')
			errors.identification = 'El número de identificación del cliente no puede quedar vacío.'

		identification = identification.replace(/\D/g, '')
		
		if (Object.keys(errors).length > 0)
			return this.setState(Object.assign({}, this.state, {errors: errors}))
		else
			this.setState(Object.assign({}, this.state, {errors: null}))

		if (contactInputs.value !== '')
			contact.push(contactInputs)
		if (addressesInputs.street !== '')
			addresses.push(addressesInputs)

		contact   = contact.filter(c => c.value !== '')
		addresses = addresses.filter(a => a.street !== '')

		this.props.onSubmit({ name, identification, contact, addresses })
	}

	update(key){
		const updatedObject = {[key]: this.refs[key].getValue()}
		
		this.setState(Object.assign({}, this.state, updatedObject));
	}

	onChangeSubForm(subform, subformInputs){
		return (data, index) => {
			let newState = Object.assign({}, this.state)
			if (data){
				if (index === undefined)
					newState[subformInputs] = data
				else 
					newState[subform][index] = data 
			} 
			this.setState(newState)
		}
	}

	remove(index, array){
		this.state[array] = [...this.state[array].slice(0, index), ...this.state[array].slice(index + 1)]
	}

	addContact(contact){
		this.state.contact = [...this.state.contact, contact]
		this.state.contactInputs.value = ''
	}

	addAddress(address){
		console.log(address);
		this.state.addresses = [...this.state.addresses, address]
		this.state.addressesInputs = this.defaultAddressesInputs
	}

	render(){
		const client = this.state

		return (
			<form onSubmit={this.submit} className="form-horizontal">
				<Input 	help={ (client.errors && client.errors.name) || null}
								placeholder="Nombre"
								type="text"
								labelClassName="col-xs-2"
								onChange={() => {this.update('name')}}
								bsStyle={(client.errors && client.errors.name) ? "error" : null}
								wrapperClassName="col-xs-10"
								label="Nombre"
								ref="name"
								value={client.name}/>
				
				<Input 	help={(client.errors && client.errors.identification) || null}
								placeholder="C.I.; DNI; Pasaporte"
								bsStyle={(client.errors && client.errors.identification) ? "error" : null}
								type="text"
								labelClassName="col-xs-2"
								onChange={() => {this.update('identification')}}
								wrapperClassName="col-xs-10"
								label="ID"
								ref="identification"
								value={client.identification}/>
				
				<Contact 	onChange={this.onChangeContact}
									first={true}
									onAdd={this.addContact}
									contact={ this.state.contactInputs }/>
				{client.contact.map( (contact, index) => <Contact	onChange={data => this.onChangeContact(data, index)}
																													contact={contact}
																													onRemove={() => this.remove(index, 'contact')}
																													key={index}/>)
				}
 
				<Address 	onChange={this.onChangeAddress}
									first={true}
									onAdd={this.addAddress}
									address={ this.state.addressesInputs } />
				{client.addresses.map( (address, index) => <Address onChange={data => this.onChangeAddress(data, index)}
																														address={address}
																														onRemove={() => this.remove(index, 'addresses')}
																														key={index}/> )
				}

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