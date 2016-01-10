import React from 'react'
import BaseClass from './base-class.js'
import {AddButton, RemoveButton} from '../buttons.js'

class Contact extends BaseClass {
	constructor(props){
		super(props)
		this.displayName = 'Contact'
		this.focusOn = 'value'
	}

	getData() {
		const {type, description, value} = this.refs
		
		return {
			type: type.value,
			description: description.value,
			value: value.value
		}
	}

	render(){
		const {first, contact, loading} = this.props
		
		return(
			<div className="form-group">
				{first && this.label('Contacto')}
				<div className={first ? "col-xs-2" : "col-xs-2 col-xs-offset-2"}>
					<select className="form-control" onChange={this.update} value={contact.type} ref="type" disabled={loading}>
						<option value="email">Email</option>
						<option value="phone">Telefono</option>
					</select>
				</div>
				<div className="col-xs-3">
					<select className="form-control" onChange={this.update} value={contact.description} ref="description" disabled={loading}>
						<option value="home">Casa</option>
						<option value="work">Trabajo</option>
						<option value="personal">Personal</option>
						<option value="other">Otro</option>
					</select>
				</div>
				<div className="col-xs-4">
					<input onKeyDown={this.onKeyDown} type="text" placeholder="Valor" onChange={this.update} className="form-control" value={contact.value} ref="value" disabled={loading}/>
				</div>
				{first ? <AddButton onClick={this.add} /> : <RemoveButton onClick={this.remove} />}
			</div>
		)
	}
}

Contact.propTypes = {
	contact: React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired,
	loading: React.PropTypes.bool
}

export default Contact