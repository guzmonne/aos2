import React from 'react'
import BaseClass from './base-class.js'

class Contact extends BaseClass {
	constructor(props){
		super(Object.assign({}, props, {focusOn: 'value', propToState: 'contact'}))
		this.displayName = 'Contact'
		this.getData = this.getData.bind(this)
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
		const {first, contact} = this.props
		const label = <label className="control-label col-xs-2">Contacto</label>
		const addButton = <div className="col-xs-1"><button onClick={this.add} className="btn btn-success"><i className="fa fa-plus"></i></button></div>
		const delButton = <div className="col-xs-1"><button onClick={this.remove} className="btn btn-danger"><i className="fa fa-minus"></i></button></div>
		
		return(
			<div className="form-group">
				{first && label}
				<div className={first ? "col-xs-2" : "col-xs-2 col-xs-offset-2"}>
					<select className="form-control" onChange={this.update} value={contact.type} ref="type">
						<option value="email">Email</option>
						<option value="phone">Telefono</option>
					</select>
				</div>
				<div className="col-xs-3">
					<select className="form-control" onChange={this.update} value={contact.description} ref="description">
						<option value="home">Casa</option>
						<option value="work">Trabajo</option>
						<option value="personal">Personal</option>
						<option value="other">Otro</option>
					</select>
				</div>
				<div className="col-xs-4">
					<input type="text" placeholder="Valor" onChange={this.update} className="form-control" value={contact.value} ref="value"/>
				</div>
				{first ? addButton : delButton}
			</div>
		)
	}
}

Contact.propTypes = {
	contact: React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired
}

export default Contact