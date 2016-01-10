import React from 'react'
import BaseClass from './base-class.js'
import {AddButton, RemoveButton} from '../buttons.js'

class Address extends BaseClass {
	constructor(props){
		super(props)
		this.displayName = 'Address'
		this.focusOn = 'street'
	}

	getData(){
		const {street, location, state} = this.refs

		return {
			street: street.value,
			location: location.value,
			state: state.value
		}
	}

	render(){
		const {first, address, loading} = this.props

		return (
			<div className="form-group">
				{first && this.label('Direcciones')}
				<div className={first ? "col-xs-3" : "col-xs-3 col-xs-offset-2"}>
					<input onKeyDown={this.onKeyDown} disabled={loading} placeholder="Calle" type="text" className="form-control" onChange={this.update} value={address.street} ref="street"/>
				</div>
				<div className="col-xs-3">
					<input onKeyDown={this.onKeyDown} disabled={loading} placeholder="Localidad" type="text" className="form-control" onChange={this.update} value={address.location} ref="location"/>
				</div>
				<div className="col-xs-3">
					<input onKeyDown={this.onKeyDown} disabled={loading} placeholder="Departamento" type="text" className="form-control" onChange={this.update} value={address.state} ref="state"/>
				</div>
				{first ? <AddButton onClick={this.add} /> : <RemoveButton onClick={this.remove} />}
			</div>
		)
	}
}

Address.propTypes = {
	address: React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired,
	loading: React.PropTypes.bool
}

export default Address