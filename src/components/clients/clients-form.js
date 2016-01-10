import React from 'react'
import {Input, Button, ButtonToolbar} from 'react-bootstrap'
import Contact from './contact.js'
import Address from './address.js'
import { SaveButton, CancelButton } from '../buttons.js'
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

	componentWillReceiveProps(newProps){
		this.setState( newProps.client )
	}

	componentDidMount(){
		this.refs.name.refs.input.focus()
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
		this.setState({identification: this.state.identification.toString().replace(/\D/g, '')})
	}

	filterEmptySubforms(){
		this.setState({
			contact: this.state.contact.
								map(c => {
									if (c.type === 'email') return c
									c.value = c.value.replace(/\s|\D/g, '')
									return c
								}).
								filter( c => c.value !== ''),
			addresses: this.state.addresses.
									map(a => {
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
				identification : parseInt(this.state.identification),
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
		const {loading} = this.props

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
								value={this.state.name}
								disabled={loading}/>
				
				<Input 	help={(this.state.errors && this.state.errors.identification) || null}
								placeholder="C.I.; DNI; Pasaporte"
								bsStyle={(this.state.errors && this.state.errors.identification) ? "error" : null}
								type="text"
								labelClassName="col-xs-2"
								onChange={() => {this.update('identification')}}
								wrapperClassName="col-xs-10"
								label="ID"
								ref="identification"
								value={this.state.identification}
								disabled={loading}/>
				
				<Contact 	onChange={this.onChangeContact}
									first={true}
									onAdd={this.addContact}
									contact={ this.state.contactInputs }
									loading={loading}/>
				{this.state.contact.map( (contact, index) => <Contact	onChange={ data => this.onChangeContact(data, index) }
																													contact={ contact }
																													onRemove={ () => this.remove(index, 'contact') }
																													key={ index }
																													loading={loading}/>)
				}
 
				<Address 	onChange={ this.onChangeAddress }
									first={ true }
									onAdd={ this.addAddress }
									address={ this.state.addressesInputs } 
									loading={loading}/>
				{this.state.addresses.map( (address, index) => <Address onChange={ data => this.onChangeAddress(data, index) }
																														address={ address }
																														onRemove={ () => this.remove(index, 'addresses') }
																														key={ index }
																														loading={loading}/> )
				}

				<div className="form-group">
					<div className="col-xs-offset-2 col-xs-10">
						<SaveButton type="submit" loading={loading}/>
					</div>
				</div>
			
			</form>
		)	
	}
}

ClientsForm.propTypes = {
	client: React.PropTypes.object.isRequired,
	loading: React.PropTypes.bool
}

export default ClientsForm