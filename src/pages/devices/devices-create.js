import React from 'react'
import { connect } from 'react-redux'
import { createDevice } from './devices.actions.js'
import { fetchDeviceCategoryHelpers } from '../configuration/general.actions.js'
import Page from '../../components/page.js'
import DeviceForm from '../../components/devices/device-form.js'

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

	componentWillMount(){
		this.props.fetchDeviceCategoryHelpers()
	}

	render(){
		const device = {
			brand: 'Panasonic',
			category: 'Electronica',
			description: 'TV LCD 22',
			model: 'VERA 22',
			subcategory: 'LCD 22"'
		}

		return(

			<Page title={this.pageTitle} breadCrumbs={this.breadCrumbs}>
				<div className="container">
					<DeviceForm device={device} categories={this.props.categories}/>
				</div>
			</Page>

		)
	}

}

function select (state){
	return {
		loading: state.devices.loading,
		categories: state.general.categories
	}
}

export default connect(
	select,
	{
		createDevice,
		fetchDeviceCategoryHelpers
	}
)(DevicesCreate)