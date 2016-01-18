import React from 'react'
import { connect } from 'react-redux'
import { createDevice } from './devices.actions.js'
import Page from '../../components/page.js'
//import DeviceForm from '../../components/devices/devices-form.js'

class DevicesCreate extends React.Component {

	constructor(props){
		super(props)
		this.title = 'Crear Equipo'
		this.pageTitle = <span><i className="fa fa-display orange"></i>{' ' + this.title}</span>
		this.breadCrumbs = [{txt: 'Equipos', to: '/devices'}, {'txt': 'Nuevo'}]
		this.submit = this.submit.bind(this)
	}

	submit(data){
		if (!data) return
		this.props.createDevice(data)
	}

	render(){
		return(

			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<div className="container">
					<h1>Crear Equipo</h1>
				</div>
			</Page>

		)
	}

}

function select (state){
	return {
		devices: state.devices
	}
}

export default connect(
	select,
	{
		createDevice
	}
)(DevicesCreate)