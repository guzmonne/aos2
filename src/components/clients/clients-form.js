import React from 'react'
import {Input, Button, ButtonToolbar} from 'react-bootstrap'
import Contact from './contact.js'
import Address from './address.js'
import * as helpers from '../../helpers/helpers.js'

class ClientsForm extends React.Component {
	constructor(props){
		super(props);
		this.displayName     = 'ClientsForm'
		this.submit          = this.submit.bind(this)

		this.addContact      = this.addContact.bind(this)
		this.addAddress      = this.addAddress.bind(this)
		this.remove          = this.remove.bind(this)

		this.formHasErrors       = this.formHasErrors.bind(this)
		this.filterEmptySubforms = this.filterEmptySubforms.bind(this)
		this.cleanIdentification = this.cleanIdentification.bind(this)
		
		this.onChangeContact = this.onChangeSubForm('contact', 'contactInputs').bind(this)
		this.onChangeAddress = this.onChangeSubForm('addresses', 'addressesInputs').bind(this)

		this.defaultAddressesInputs = { street: '', location: '', state: ''}
		this.defaultContactInputs   = { type: 'phone', value: '', description: ''}
		
		this.state = Object.assign( {}, 
			this.props.client,
			{
				contactInputs: Object.assign({}, this.defaultContactInputs),
				addressesInputs: Object.assign({}, this.defaultAddressesInputs),
				errors: null
			}
		)
	}

	formHasErrors(){
		let errors = {}
		const {name, identification} = this.state

		if (name === '') errors.name = 'El nombre del cliente no puede quedar vacío.'
		if (identification === '') errors.identification = 'El número de identificación del cliente no puede quedar vacío.'

		this.setState({errors})
		
		return ( Object.keys(errors).length > 0 )
	}

	cleanIdentification(){
		this.setState({identification: this.state.identification.replace(/\D/g, '')})
	}

	filterEmptySubforms(){
		this.setState({
			contact: this.state.contact.
								map(c => {
									c.value = c.value.replace(/\s|\D/g, '')
									return c
								}).
								filter( c => c.value !== ''),
			addresses: this.state.addresses.
									map(a => {
										console.log(helpers.toTitleCase(a.street))
										a.street = helpers.toTitleCase(a.street)
										a.location = a.location.toUpperCase()
										a.state = a.state.toUpperCase()
										return a
									}).
									filter( a => a.street !== '')
		})
	}

	submit(e){
		e.preventDefault()

		if (this.formHasErrors()) return

		this.cleanIdentification()
		this.addContact(this.state.contactInputs)
		this.addAddress(this.state.addressesInputs)

		setTimeout(() => this.filterEmptySubforms())

		return setTimeout(() => this.props.onSubmit({
				name           : this.state.name,
				identification : this.state.identification,
				contact        : this.state.contact,
				addresses      : this.state.addresses
			})
		)
	}

	update(key){
		this.setState({[key]: this.refs[key].getValue()});
	}

	onChangeSubForm(subform, subformInputs){
		return (data, index) => {
			if (data && index === undefined) {
				this.setState({[subformInputs]: data})
			} else if (data) {
				const cloneState = [...this.state[subform]]
				cloneState[index] = data
				this.setState({[subform]: cloneState})
			}
		}
	}

	remove(index, array){
		this.setState( {[array]: [...this.state[array].slice(0, index), ...this.state[array].slice(index + 1) ]} )
	}

	addContact(contact){
		if (contact.value === '') return

		this.setState({
			contact: [...this.state.contact, contact],
			contactInputs: Object.assign({}, this.state.contactInputs, {value: ''})
		})
	}

	addAddress(address){
		if (address.street === '') return

		this.setState({
			addresses: [...this.state.addresses, address],
			addressesInputs: Object.assign({}, this.defaultAddressesInputs)
		})
	}

	render(){
		console.log(this.state)

		return (
			<form onSubmit={this.submit} className="form-horizontal">
				<Input 	help={ (this.state.errors && this.state.errors.name) || null}
								placeholder="Nombre"
								type="text"
								labelClassName="col-xs-2"
								onChange={() => {this.update('name')}}
								bsStyle={(this.state.errors && this.state.errors.name) ? "error" : null}
								wrapperClassName="col-xs-10"
								label="Nombre"
								ref="name"
								value={this.state.name}/>
				
				<Input 	help={(this.state.errors && this.state.errors.identification) || null}
								placeholder="C.I.; DNI; Pasaporte"
								bsStyle={(this.state.errors && this.state.errors.identification) ? "error" : null}
								type="text"
								labelClassName="col-xs-2"
								onChange={() => {this.update('identification')}}
								wrapperClassName="col-xs-10"
								label="ID"
								ref="identification"
								value={this.state.identification}/>
				
				<Contact 	onChange={this.onChangeContact}
									first={true}
									onAdd={this.addContact}
									contact={ this.state.contactInputs }/>
				{this.state.contact.map( (contact, index) => <Contact	onChange={ data => this.onChangeContact(data, index) }
																													contact={ contact }
																													onRemove={ () => this.remove(index, 'contact') }
																													key={ index }/>)
				}
 
				<Address 	onChange={ this.onChangeAddress }
									first={ true }
									onAdd={ this.addAddress }
									address={ this.state.addressesInputs } />
				{this.state.addresses.map( (address, index) => <Address onChange={ data => this.onChangeAddress(data, index) }
																														address={ address }
																														onRemove={ () => this.remove(index, 'addresses') }
																														key={ index }/> )
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